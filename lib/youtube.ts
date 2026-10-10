export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  published: string;
  thumbnail: string;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, ref: string) => {
    if (ref[0] !== "#") return ENTITIES[ref] ?? m;
    const code =
      ref[1] === "x" || ref[1] === "X"
        ? parseInt(ref.slice(2), 16)
        : parseInt(ref.slice(1), 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : m;
  });
}

function tag(xml: string, name: string): string | undefined {
  return xml.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1];
}

// The channel feed is a small, fixed Atom shape; regex avoids adding an XML parser dependency.
export function parseYouTubeFeed(xml: string): YouTubeVideo[] {
  return (xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []).flatMap((entry) => {
    const id = tag(entry, "yt:videoId");
    const title = tag(entry, "title");
    if (!id || !/^[\w-]+$/.test(id) || !title) return [];
    return [
      {
        id,
        title: decodeEntities(title),
        url: `https://www.youtube.com/watch?v=${id}`,
        published: tag(entry, "published") ?? "",
        // Built from the id so only one image host (i.ytimg.com) needs allowing.
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      },
    ];
  });
}

export async function getLatestVideos(
  channelId: string | null,
): Promise<YouTubeVideo[]> {
  if (!channelId) return [];
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
      // Without a timeout a stalled connection never rejects, so the fallback never runs.
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return [];
    return parseYouTubeFeed(await res.text()).slice(0, 3);
  } catch {
    // The homepage must render even when YouTube is down; blog-only is the fallback.
    return [];
  }
}
