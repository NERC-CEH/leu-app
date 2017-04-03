<div class="app-logo">
  <h3>European Ladybirds</h3>
</div>

<div id="intro-snippet">
  //TODO
</div>

<ul id="buttons" class="table-view buttons">
  <li class="table-view-cell">
    <a href="#info/species" class="navigate-right">
      <span class="media-object pull-left icon icon-species"></span>
      Species Info
    </a>
  </li>
  <li class="table-view-cell">
    <a id="sample-btn" class="navigate-right">
      <span class="media-object pull-left icon icon-plus"></span>
      Record
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#info" class="navigate-right">
      <span class="media-object pull-left icon icon-info"></span>
      <% if (obj.samples > 0) { %>
      <span class="badge <%- obj.needSync ? 'error' : '' %>"><%- obj.samples %></span>
      <% } %>
      App Info
    </a>
  </li>
</ul>

