export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  published: string;
  thumbnail: string;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

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
        title: title.replace(
          /&(amp|lt|gt|quot|#39);/g,
          (m) => ENTITIES[m] ?? m,
        ),
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
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    return parseYouTubeFeed(await res.text()).slice(0, 3);
  } catch {
    // The homepage must render even when YouTube is down; blog-only is the fallback.
    return [];
  }
}
