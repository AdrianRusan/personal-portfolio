/**
 * @jest-environment node
 */
import { parseYouTubeFeed } from "@/lib/youtube";

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
