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

Zeeschuimer only works in the Firefox browser, so if you don't have that installed, you can download it [here](https://www.firefox.com/). 

You can install Zeeschuimer by navigating to the latest release on [this Github page](https://github.com/digitalmethodsinitiative/zeeschuimer/releases). When in Firefox, you can click on the **.xpi** file and it will automatically install.

A button with the Zeeschuimer logo (<img alt="Zeeschuimer's browser icon, a yellow 'Z' on a green background" src="/zeeschuimer-16.png">) should appear in your browser toolbar (a stylized Z). When you click on the icon, you will be shown the Zeeschuimer control panel:

(<img alt="Zeeschuimer's control panel" src="/zs.png">)


