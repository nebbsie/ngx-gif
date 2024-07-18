import { Observable } from 'rxjs';

export type TenorSearchApiResult = {
  readonly results: TenorObject[];
  readonly next: string;
};

export type TenorCategoriesApiResult = {
  readonly tags: readonly TenorCategory[];
  readonly locale: string;
};

export type TenorSearchOptions = {
  query: string;
  limit?: number;
  mediaFormats?: TenorMediaFormatType[];
  contentFilter?: TenorContentFilterType;
};

export type TenorInterface = {
  search: (options: TenorSearchOptions) => Observable<readonly TenorObject[]>;
  categories: () => Observable<readonly TenorCategory[]>;
};

/**
 * https://developers.google.com/tenor/guides/response-objects-and-errors#media-object
 */
export type TenorMediaFormat = {
  /**
   * Width and height of the media in pixels.
   */
  readonly url: string;
  /**
   * Represents the time in seconds for one loop of the content. If the content is static, the duration is set to 0.
   */
  readonly duration: number;
  /**
   * Width and height of the media in pixels.
   */
  readonly size: number;
  /**
   * Width and height of the media in pixels.
   */
  readonly dims: number[];
};

export type TenorContentFilterType = 'high' | 'medium' | 'low' | 'off';

export type TenorMediaFormatType =
  | 'preview'
  | 'gif'
  | 'mediumgif'
  | 'tinygif'
  | 'nanogif'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm'
  | 'webp_transparent'
  | 'tinywebp_transparent'
  | 'nanowebp_transparent'
  | 'gif_transparent'
  | 'tinygif_transparent'
  | 'nanogif_transparent';

export type TenorCategory = {
  readonly name: string;
  readonly searchterm: string;
  readonly path: string;
  readonly image: string;
};

/**
 * See: https://developers.google.com/tenor/guides/response-objects-and-errors#media-object
 */
export type TenorObject = {
  /**
   * Tenor result identifier.
   */
  readonly id: string;
  /**
   * The title of the post.
   */
  readonly title: string;
  /**
   * A Unix timestamp that represents when this post was created.
   */
  readonly created: number;
  /**
   * Returns true if this post contains audio.
   *
   * Note: Only video formats support audio. The GIF image file format can't contain audio information.
   */
  readonly hasaudio: boolean;
  /**
   * A dictionary with a content format as the key and a Media Object as the value.
   */
  readonly media_formats: {
    /**
     * Resolution and size: High quality single frame GIF format; smaller in size than the GIF format
     * Dimensions: Original upload dimensions (no limits)
     * Usage notes: Make this the first frame of the content. It's intended for use as a thumbnail preview.
     * This format is supported for GIFs and stickers.
     */
    readonly preview: TenorMediaFormat;
    /**
     * Resolution and size: High-quality GIF format; largest file size available
     * Dimensions: Original upload dimensions (no limits)
     * Usage notes: Use this size for GIF shares on desktop.
     * This format is supported for GIFs and stickers.
     **/
    readonly gif: TenorMediaFormat;
    /**
     * Resolution and size: Small reduction in size of the GIF format
     * Dimensions: Original upload dimensions (no limits) but much higher compression rate
     * Usage notes: Use this size for GIF previews on desktop.
     * This format is supported for GIFs and stickers.
     */
    readonly mediumgif: TenorMediaFormat;
    /**
     * Resolution and size: Reduced size of the GIF format
     * Dimensions: Up to 220 pixels wide. Height scaled to preserve the aspect ratio.
     * Usage notes: Use this size for GIF previews and shares on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly tinygif: TenorMediaFormat;
    /**
     * Resolution and size: Smallest size of the GIF format
     * Dimensions: Up to 90 pixels tall. Width scaled to preserve the aspect ratio.
     * Usage notes: Use this size for GIF previews on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly nanogif: TenorMediaFormat;
    /**
     * Resolution and size: Highest quality video format; largest of the video formats, but smaller than GIF
     * Dimensions: Similar to GIF but padded to fit video container specifications, which are usually 8-pixel increments.
     * Usage notes: Use this size for MP4 previews and shares on desktop.
     * This format is supported for GIFs and stickers.
     */
    readonly mp4: TenorMediaFormat;
    /**
     * Resolution and size: Highest quality video format; larger in size than MP4
     * Dimensions: Similar to GIF but padded to fit video container specifications, which are usually 8-pixel increments.
     * Usage notes: Use this size for MP4 shares when you want the video clip to run a few times rather than only once.
     * This format is supported for GIFs and stickers.
     */
    readonly loopedmp4: TenorMediaFormat;
    /**
     * Resolution and size: Reduced size of the MP4 format
     * Dimensions: Variable width and height, with a maximum bounding box of 320x320 pixels
     * Usage notes: Use this size for MP4 previews and shares on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly tinymp4: TenorMediaFormat;
    /**
     * Resolution and size: Smallest size of the MP4 format
     * Dimensions: Variable width and height, with a maximum bounding box of 150x150 pixels
     * Usage notes: Use this size for MP4 previews on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly nanomp4: TenorMediaFormat;
    /**
     * Resolution and size: Lower quality video format; smaller in size than MP4
     * Dimensions: Similar to GIF but padded to fit video container specifications, which are usually 8-pixel increments.
     * Usage notes: Use this size for WebM previews and shares on desktop.
     * This format is supported for GIFs and stickers.
     */
    readonly webm: TenorMediaFormat;
    /**
     * Resolution and size: Reduced size of the WebM format
     * Dimensions: Variable width and height, with a maximum bounding box of 320x320 pixels
     * Usage notes: Use this size for GIF shares on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly tinywebm: TenorMediaFormat;
    /**
     * Resolution and size: Smallest size of the WebM format
     * Dimensions: Variable width and height, with a maximum bounding box of 150x150 pixels
     * Usage notes: Use this size for GIF previews on mobile.
     * This format is supported for GIFs and stickers.
     */
    readonly nanowebm: TenorMediaFormat;
    /**
     * Resolution and size: High-quality WebP sticker format; largest file size available
     * Dimensions: Original upload dimensions (no limits)
     * Usage notes: Use this size for sticker shares for high-bandwidth users.
     * This format is supported for stickers.
     */
    readonly webp_transparent: TenorMediaFormat;
    /**
     * Resolution and size: Reduced size of the WebP sticker format; maximum size of 500 KB
     * Dimensions: Up to 220x220 pixels, height scaled to preserve the aspect ratio.
     * Usage notes: Use this size for sticker previews for high-bandwidth users and shares for low-bandwidth users.
     * This format is supported for stickers.
     */
    readonly tinywebp_transparent: TenorMediaFormat;
    /**
     * Resolution and size: Smallest size of the WebP sticker format; maximum size of 100 KB
     * Dimensions: Up to 90x90 pixels, with the width scaled to preserve the aspect ratio.
     * Usage notes: Use this size for sticker previews for low-bandwidth users.
     * This format is supported for stickers.
     */
    readonly nanowebp_transparent: TenorMediaFormat;
    /**
     * Resolution and size: High-quality GIF sticker format; largest file size available
     * Dimensions: Original upload dimensions (no limits)
     * Usage notes: Use this size for sticker shares for high-bandwidth users.
     * This format is supported for stickers.
     */
    readonly gif_transparent: TenorMediaFormat;
    /**
     * Resolution and size: Reduced size of the GIF sticker format; maximum size of 500 KB
     * Dimensions: Up to 220x220 pixels, with the height scaled to preserve the aspect ratio.
     * Usage notes: Use this size for sticker previews for high-bandwidth users and shares for low-bandwidth users.
     * This format is supported for stickers.
     */
    readonly tinygif_transparent: TenorMediaFormat;
    /**
     * Resolution and size: Smallest size of the GIF sticker format; maximum size of 100 KB
     * Dimensions: Up to 90x90 pixels, with the width scaled to preserve the aspect ratio.
     * Usage notes: Use this size for sticker previews for low-bandwidth users.
     * This format is supported for sticker.
     */
    readonly nanogif_transparent: TenorMediaFormat;
  };
};

export type TenorProvideOptions = {
  apiKey: string;
  clientKey: string;
};
