---
layout: home
title: Scraping and situating social media data
permalink: /
---

presented by [Craig Fahner](https://www.craigfahner.com), February 11, 2026.


[**Zeeschuimer**](https://github.com/digitalmethodsinitiative/zeeschuimer) is a browser plugin developed by the [Digital Methods Initiative](https://aihr.uva.nl/humanities-labs/digital-methods-initiative/digital-methods-initiative.html?cb) at the University of Amsterdam. When activated, Zeeschuimer monitors network activity on social media sites. It collects the *unstructured* data that is seen on social media feeds and produces *structured* datasets that can be used for later analysis. 

Social Media platforms like Facebook, Instagram, Tiktok, X, etc. have APIs (Application Programming Interfaces) that permit some access to platform data. While these APIs were, about 10 years ago, quite useful for social media research, they have since become increasingly restricted, limiting the kinds of research that can be done through platforms' officially sanctioned channels. Zeeschuimer has emerged in response to these limitations, allowing researchers to access and analyze social media posts in a variety of contexts.

Crucially, Zeeschuimer is a useful tool for examining the operation of recommendation algorithms, since it can monitor and archive individual instagram news feeds. This workshop will explore how to archive personalized news feeds using this tool, and how to visualize, analyze and annotate that data. 

## 1. The Ethics of Scraping

Social media content is a unique source of research data, and its use carries a number of ethical contradictions. The use of publicly-posted social media content [does not typically require IRB review](https://irb.upenn.edu/homepage/social-behavioral-homepage/guidance/types-of-social-behavioral-research/use-of-social-media-as-a-research-activity/#:~:text=Please%20be%20especially%20mindful%20when,and%20other%20image-based%20content.&text=Use%20of%20private%20social%20media%20data%20requires%20IRB%20review). There are, however, other ethical considerations to take into account when handling social media data that comes from personal accounts. 

A social media user, for instance, might have created their public account to share personal photos with their immediate family. Even though this content is technically published to the internet-at-large, we cannot assume that the user has implied consent to have their data used in other contexts. In other words, *one's expectation of privacy is a matter of context*. A user with a handful of followers likely uses a social media platform with a much different expectation of privacy than an influencer, celebrity, corporation, sports team, etc. 

[Social media platforms, themselves, do not set a particularly high bar for informed consent around data collection and privacy](https://medium.com/illumination/facebook-will-use-your-posts-to-train-ai-models-bee2268da828). That said, it is important to develop a nuanced and rigorous ethical framework when publishing or exhibiting work that uses social media data. This framework might vary from project to project, and can involve decisions such as:

- Whether or not to anonymize usernames
- Whether to retain text and image content vs quantifications thereof
- Whether to represent social media content from personal accounts vs highly-public accounts

Those kinds of decisions will ultimately be dependent on what kind of study or visualization you're trying to make.

As a rule of thumb, however, it is best to avoid the following:

- **Do not include data from private accounts!**: many social media sites enable a private account option, in which a private user's posts are not visible to the public – only to an approved set of users. We can assume these accounts have not consented to their content being published elsewhere. 
- **Do not use your own account!**: your social media feeds are, in many ways, a portrait of you – your interests, behaviors and activities are reflected in your feed. Unless you are doing a research project in which *you* are the subject, use a research-specific account. The next section explores one method for doing this: the Research Persona Method.

Here are some additional resources for considering the ethics of using social media data:

- [Association of Internet Researchers. 2019. “Internet Research: Ethical Guidelines 3.0.”](https://aoir.org/reports/ethics3.pdf)
- [Melanie Walsh. 2023. “Using Social Media Data in Research—Whether You’re in English Lit or Information Science" ](https://melaniewalsh.org/blog/2023/social-media-research/)
- [Walsh, Melanie. 2023. “The Challenges and Possibilities of Social Media Data: New Directions in Literary Studies and the Digital.” Debates in the Digital Humanities 2023.](https://dhdebates.gc.cuny.edu/read/f3f87448-138c-4d19-8ff8-b06acf40ddd1/section/a57b98ab-0f10-45d0-b205-3e563aab7ea8#ch18)
- [“Use of Social Media as a Research Activity.” Penn IRB.](https://irb.upenn.edu/homepage/social-behavioral-homepage/guidance/types-of-social-behavioral-research/use-of-social-media-as-a-research-activity/)

## 2. The Research Persona Method

Let's consider a sample research question:

> To what extent do Instagram followers of bodybuilding podcasts received recommended content with right-wing messaging?

Rather than using your own account to examine this question – and bringing along your existing algorithmic profile and all of its biases – you should work with one or more research-oriented accounts.

The **Research Persona Method** (Bounegru et al, 2022) provides helpful guidelines for creating accounts that are specific to a given research question. This method involves the creation of research personas, fictitious and speculative roles by which algorithmic recommendation can be observed in its situated context.

Creating a research persona involves creating a fictional character that relates to the research question in some way. The method suggests that you establish a biography for your persona, using that as a guide for how you will navigate the platform. When you collect platform data, you are essentially "performing" this character. Proponents of this method suggest that it is best enacted and performed in teams, so that decisions while using the platform are not based on personal instict but rather a shared agreement on the fictional character's behavior.

### Creating and using a persona

Consider the following aspects when you are creating a user persona:

- What is the persona's **background**? What are the life events that shaped how they think? What kind of environment did the persona grow up in?
- What is the persona's **rationale**? What are their motivations? What obstacles have they had to deal with? How do they accomplish their goals?
- **Embodiment**: What do they look like? How do they speak? How do they hold themselves in the world?
- What are their **subconscious** behaviors? What are their habits that they might not be aware of? What is this person's affective universe? What kinds of contradictions define them?

These parameters should be considered when signing up for a new account, filling out biographical information, and engaging with platform content (following accounts, viewing posts, etc). You may want to use a generative AI to create a fictional face for your user's profile picture, as well.

More information on the Research Persona Method can be found here:

- [Digital Methods Initiative. “Research Persona as Digital Method.”](https://wiki.digitalmethods.net/Dmi/SummerSchool2019ResearchPersonaAsDigitalMethod)
- [Bounegru, Liliana, Melody Devries, and Esther Weltevrede. 2022. “The Research Persona Method: Figuring and Reconfiguring Personalised Information Flows.” In Figure: Concept and Method. Springer Nature Singapore Singapore.](https://library.oapen.org/bitstream/handle/20.500.12657/59380/978-981-19-2476-7.pdf?sequence=1#page=88)

## 3. Scraping Social Media Data with Zeeschuimer

### Step 1: Installing Zeeschuimer and taking your first recording

Zeeschuimer only works in the Firefox browser, so if you don't have that installed, you can download it [here](https://www.firefox.com/). 

You can install Zeeschuimer by navigating to the latest release on [this Github page](https://github.com/digitalmethodsinitiative/zeeschuimer/releases). When in Firefox, you can click on the **.xpi** file and it will automatically install.

A button with the Zeeschuimer logo (![Z]({{ "/assets/zeeschuimer-16.png" | relative_url }})) should appear in your browser toolbar (a stylized Z). When you click on the icon, you will be shown the Zeeschuimer control panel:

![Zeeschuimer's control panel]({{ "/assets/zs.png" | relative_url }})

Zeeschuimer works sort of like a tape recorder. When you activate any of the social media options, Zeeschuimer will begin recording data on those sites. That data is dumped into an NDJSON file (new-line delimited JSON). The [NDJSON format](https://github.com/ndjson/ndjson-spec) isn't the most common data collection format, but it's efficient for maintaining a dataset that is constantly being appended with new data points. We'll look at different ways of parsing and converting NDJSON files.

If you are scraping Instagram data, for instance, **first activate Instagram capture** in the Zeeschuimer control panel.  Then, scroll through Instagram to capture some content. This could either be on a specific account's page, the main feed, or the "reels" page. **Zeeschuimer will continue logging posts until you deactivate Instagram capture**! So, when you are finished, be sure to turn it off in the Zeeschuimer control panel.

You will see a few options adjacent to the Instagram row in the panel:

![Zeeschuimer's insta panel]({{ "/assets/insta.png" | relative_url }})

Here, you can delete the captured data, and you can save the data as an NDJSON file. You can also send the data to an analysis platform called 4CAT. 

### Step 2: Exploring the NDJSON file

The file produced by Zeeschuimer is not streamlined for human readability the way that XML and other formats are. It's designed for easy parsability by programming languages like JavaScript and Python. It also allows for nested datasets – for instance, a single post can have a nested dataset of comments.

Here's a summary of the data that is included in the NDJSON file:

**Top-Level (Collection / Crawl Metadata)**

These describe **how and where the post was collected**, not the post itself.

| **Field** | **Meaning** |
| --- | --- |
| nav_index | Internal crawl/navigation position marker |
| item_id | Unique ID for this collected item (postID_userID format) |
| timestamp_collected | When this data was captured (Unix ms) |
| source_platform | Platform domain (instagram.com) |
| source_platform_url | Base URL of platform |
| source_url | API endpoint used to fetch data |
| user_agent | Browser/client used for scraping |
| data | **The actual Instagram post object** (nested data - see below) |
| id  | Internal dataset row ID |

**Core Instagram Post Object**

This contains **everything about the post itself**.

**Identity & Classification**

| **Field** | **Meaning** |
| --- | --- |
| id  | Instagram media ID (post identifier) |
| pk  | Primary key version of the media ID |
| code | Shortcode used in Instagram URLs |
| media_type | Type of post |
| product_type | Content type |
| inventory_source | Feed source classification |
| explore.title | Discovery surface (e.g. "Suggested for you") |

**Author (data.user)**

Information about the account that posted the content.

| **Field** | **Meaning** |
| --- | --- |
| pk / id | User ID |
| username | Handle |
| full_name | Display name |
| profile_pic_url | Profile image |
| hd_profile_pic_url_info.url | High-res profile image |
| is_verified | Blue check |
| is_private | Private account flag |
| is_unpublished | Account unpublished flag |
| is_embeds_disabled | Embedding restrictions |
| latest_reel_media | Timestamp of most recent Reel |
| friendship_status.following | Viewer follows this user |
| friendship_status.is_feed_favorite | Viewer marked as favorite |
| transparency_\* | Account transparency labels |
| ai_agent_owner_username | AI ownership tag (if any) |
| live_broadcast_\* | Live video metadata |

**Timing**

| **Field** | **Meaning** |
| --- | --- |
| taken_at | When post was created (Unix seconds format) |
| timestamp_collected | When _you_ captured it (Unix ms format) |

**Caption**

| **Field** | **Meaning** |
| --- | --- |
| caption.pk | Caption ID |
| caption.text | Full caption text |
| caption.has_translation | Translation availability |
| caption_is_edited | Caption edited after posting |

**Engagement Metrics**

| **Field** | **Meaning** |
| --- | --- |
| like_count | Likes on Instagram |
| fb_like_count | Likes on Facebook crosspost |
| comment_count | Number of comments |
| view_count | Video views |
| media_repost_count | Times reposted |
| has_liked | Whether viewer liked it |
| has_viewer_saved | Whether viewer saved it |
| hidden_likes_string_variant | Like count display control |

**Video / Media**

| **Field** | **Meaning** |
| --- | --- |
| original_width / original_height | Native video resolution |
| video_versions | Progressive MP4 files at various sizes |
| video_dash_manifest | DASH streaming manifest (adaptive streaming) |
| number_of_qualities | Count of video quality tiers |
| is_dash_eligible | Supports DASH streaming |
| has_audio | Video contains audio |
| duration | Video length (in seconds) |

**Thumbnails & Images**

| **Field** | **Meaning** |
| --- | --- |
| image_versions2.candidates | Thumbnail images at many resolutions |
| display_uri | Main display image |

**Audio / Music (Reel soundtrack)**

Located in clips_metadata.music_info

| **Field** | **Meaning** |
| --- | --- |
| music_asset_info.audio_cluster_id | Track ID |
| music_asset_info.title | Song title |
| music_asset_info.display_artist | Artist name |
| music_asset_info.is_explicit | Explicit content flag |
| music_consumption_info.is_trending_in_clips | Trending audio flag |
| music_consumption_info.should_mute_audio | Audio mute recommendation |

**Commercial / Promotion**

| **Field** | **Meaning** |
| --- | --- |
| is_paid_partnership | Sponsored partnership flag |
| affiliate_info | Affiliate marketing data |
| sponsor_tags | Tagged sponsors |
| branded_content_tags | Branded collaborators |
| can_see_insights_as_brand | Brand analytics visibility |

**Comments & Social**

| **Field** | **Meaning** |
| --- | --- |
| comments | Comment preview objects |
| comments_disabled | Are comments turned off |
| commenting_disabled_for_viewer | Viewer-specific restriction |
| top_likers | Users who liked |
| facepile_top_likers | Displayed liker avatars |
| social_context | "Liked by X" social proof |

**Sharing & Distribution**

| **Field** | **Meaning** |
| --- | --- |
| can_viewer_reshare | Viewer can reshare |
| can_reshare | General reshare permission |
| sharing_friction_info | Reshare warning system |
| crosspost_metadata.is_feedback_aggregated | FB/IG engagement merge |
| is_shared_to_fb | Shared to Facebook |

**Location**

| **Field** | **Meaning** |
| --- | --- |
| location | Location tag |


### Step 3: Previewing and converting Zeeschuimer data

The Digital Methods Initiative provides their own data analysis tool that is compatible with Zeeschuimer called [4CAT](https://zeeschuimer.4cat.nl/). 4CAT can do things like 
- Performing text analysis functions
- Export network analysis data
- Export Zeeschuimer data as CSV
- Interface with Machine Learning API for advanced analysis

![4cat]({{ "/assets/4cat.png" | relative_url }})

While 4CAT is certainly a very useful tool, it unfortunately doesn't allow for traversal of all of the nested data contained in Instagram data sets, such as individual comments and nested post data. So we will be dealing with the raw data instead!

