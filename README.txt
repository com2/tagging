<h1> Goals </h1>

<h2>Usability</h2>
This plugin should provide the ability and usability to tag content. Tagging should be fast as hell, it should be inviting. This is one goal.

<h2>On the fly tagging</h2>
Tag content without switiching into the edito mode. Provide easy and fast interfaces for those purposes

<h2>Extensibility</h2>
This plugin should become very stable and use the current Drupal-API by best practice - as much as possible. Its not the primary goal to have the newest features in here as fast as possible, its more about getting them done right.
This should provide the ability to be highly extensible, providing a API for other plugins to reuse the UX-Parts and write better Tagging-tools. One of the primary Tools are semantic suggestions for tags

<h2>Tag-Suggestions</h2>
This plugin should provide the needed API to let other modules provide suggestions for the most important tags for the current content. The user can be supported to learn, how tagging should work. Also, the user can save a lot of time, because he can simply click on a set of suggested terms, using his mouse. Or remove them - by using his mouse again.
Suggestions can have weights and therefor are sorted

<h2>Autotagging</h2>
As a long term goal, based on the suggestions, user should be able to have a "autotag this content" button


<h1>Installation</h1>
You need JQuery and taxonomy, which are both in the Drupal-Core.
<ol>
 <li>Just activate the module and then create or edit a tag-Vocabulary.</li>
 <li>Got to the consiguration page if you like. Disable or enable to suggestions example and set the maximum amount of suggestions in general</li>
 <li>Check the checkbox "Tagggin Widget"</li>
 <li>Edit a node - use the new widget</li>
</ol>

<h2>Note</h2>
You have to activate the Tagging-Widget for every vocabulary


<h1>API</h1>
<h2>hook_tagging_suggestion($vid, $node)</h2>
Every time a module gets edited, all registered modules using hook_suggestions are called. They get the current vocabulary ID and the current node as arguments. The hooks are expected to return an array, with a hash for each item inside:
[]['#name'] = "termname"
[]['#weight]= decimal between 1 and 10
Heigher weights, means faster sinking, means the suggestion is not to "important" :)

This way you can include suggestions using opencalais or extractor

<h2>tagging_suggestins_alter($suggestions,$vid)</h2>
You can alter the suggestions <b>after</b> the hook_tagging_suggestion have been called. Make exclusions, your own stopword or context-sensitive additions.

<h2>theme_tagging_suggestions($suggestions,$vid)</h2>
Render the list of suggestions as HTML

<h2>theme_tagging_widget</h2>
Render the whole tagging_widget. Give it a new layout or a new UX.

<h2>JQuery Plugin: Tagging</h2>
$('selectorname-ID').tagging()
Thats pretty anything you need to initialize any input element on the page. You have to provide some wrappers:
<ul>
<li> .tagging-button-ID : Optional Button for "add this term"</li>
<li>.tagging_widget-ID: Input field, which will be your autocompletition-field</li>
<li>.tagging-wrapper-ID: Where should all added tags get visually shown</li>
<li>.suggestion-tagging-wrapper-ID: where should the suggested tags get shown</li>
<li>.tagging-widget-target-ID: Where should the tags be saved in. Most probably some vocab-edit-field (hidden)</li>
</ul>
<b>The JQuery-Plugin will ge more generic so it can be used more widely. Most of the options which are static right now, should be changeable by options. The current one should be the default</b>

<h1>Contributions / Issues</h1>
Contributions are highly respected, also feedback on issues or patches. 

<h1>Feature requests</h1>
Please don't hassle with feature request, but please think about them properly, before you file in a issue-ticket. Please provide a basic outline of what the goal or the benefit of this feature would be. Outline the group of user you think is interested in.

Implement them! :)

<b>This plugin was sponsored by <a href="http://impressive-media.de">Impressive.media GbR</a></b>