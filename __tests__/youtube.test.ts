/**
 * @jest-environment node
 */
import { getLatestVideos, parseYouTubeFeed } from "@/lib/youtube";

// Trimmed shape of https://www.youtube.com/feeds/videos.xml?channel_id=…
const FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
 <title>Channel</title>
 <entry>
  <id>yt:video:abc123DEF_-</id>
  <yt:videoId>abc123DEF_-</yt:videoId>
  <title>Six weeks of Claude Code &amp; agents</title>
  <link rel="alternate" href="https://www.youtube.com/watch?v=abc123DEF_-"/>
  <published>2026-10-01T10:00:00+00:00</published>
  <media:group><media:thumbnail url="https://i3.ytimg.com/vi/abc123DEF_-/hqdefault.jpg" width="480" height="360"/></media:group>
 </entry>
 <entry>
  <yt:videoId>zzz999</yt:videoId>
  <title>Second</title>
  <published>2026-09-20T10:00:00+00:00</published>
 </entry>
</feed>`;

describe("parseYouTubeFeed", () => {
  it("returns one video per entry with id, decoded title, url, date and thumbnail", () => {
    expect(parseYouTubeFeed(FEED)).toEqual([
      {
        id: "abc123DEF_-",
        title: "Six weeks of Claude Code & agents",
        url: "https://www.youtube.com/watch?v=abc123DEF_-",
        published: "2026-10-01T10:00:00+00:00",
        thumbnail: "https://i.ytimg.com/vi/abc123DEF_-/hqdefault.jpg",
      },
      {
        id: "zzz999",
        title: "Second",
        url: "https://www.youtube.com/watch?v=zzz999",
        published: "2026-09-20T10:00:00+00:00",
        thumbnail: "https://i.ytimg.com/vi/zzz999/hqdefault.jpg",
      },
    ]);
  });
});

describe("parseYouTubeFeed entities", () => {
  it("decodes numeric and hex character references in titles", () => {
    const xml = "<entry><yt:videoId>x1</yt:videoId><title>I&#8217;m &#x27;in&#x27; &amp; out</title></entry>";
    expect(parseYouTubeFeed(xml)[0]?.title).toBe("I\u2019m 'in' & out");
  });
});

describe("getLatestVideos", () => {
  const realFetch = global.fetch;
  afterEach(() => {
    global.fetch = realFetch;
  });

  it("returns [] without fetching when no channel id is set", async () => {
    global.fetch = jest.fn();
    await expect(getLatestVideos(null)).resolves.toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches the channel feed hourly and returns at most 3 videos", async () => {
    const entry = FEED.match(/<entry>[\s\S]*?<\/entry>/)![0];
    const four = `<feed>${entry.repeat(4)}</feed>`;
    global.fetch = jest.fn().mockResolvedValue(new Response(four));
    const videos = await getLatestVideos("UC123");
    expect(videos).toHaveLength(3);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UC123",
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it("falls back to [] when the fetch rejects", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("offline"));
    await expect(getLatestVideos("UC123")).resolves.toEqual([]);
  });

  it("aborts a stalled fetch after a timeout", async () => {
    global.fetch = jest.fn().mockResolvedValue(new Response("<feed/>"));
    await getLatestVideos("UC123");
    const init = (global.fetch as jest.Mock).mock.calls[0][1];
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("falls back to [] on a non-200 response", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(new Response("nope", { status: 404 }));
    await expect(getLatestVideos("UC123")).resolves.toEqual([]);
  });
});
