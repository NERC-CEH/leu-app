<div class="info-message">
  <p><%= t('This record has been submitted and cannot be edited within this App.') %>
</div>
<ul class="table-view core inputs info no-top">
  <li class="table-view-cell species">
    <% if (obj.commonName) { %>
      <span class="media-object pull-right descript"><%- obj.commonName %></span>
    <% } %>
    <span class="media-object pull-right descript"><i><%- obj.scientificName %></i></span>
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-location"></span>
    <span class="media-object pull-right descript"><%- obj.locationName %></span>
    <span class="media-object pull-right descript"><%- obj.location %></span>
    <%= t('Location') %>
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-calendar"></span>
    <span class="media-object pull-right descript"><%- obj.date %></span>
    <%= t('Date') %>
  </li>
  <% if (obj.number) { %>
    <li class="table-view-cell">
      <span class="media-object pull-left icon icon-number"></span>
      <span class="media-object pull-right descript"><%- obj.number %></span>
      <%= t('Number') %>
    </li>
  <% } %>
  <% if (obj.habitat) { %>
    <li class="table-view-cell">
      <span class="media-object pull-left icon icon-habitat"></span>
      <span class="media-object pull-right descript"><%- obj.habitat %></span>
      <%= t('Habitat') %>
    </li>
  <% } %>
  <% if (obj.comment) { %>
    <li class="table-view-cell">
      <span class="media-object pull-left icon icon-comment"></span>
      <%= t('Comment') %>
      <span class="comment descript"><%- obj.comment %></span>
    </li>
  <% } %>
  <% if (obj.media.length) { %>
    <li id="img-array">
      <% obj.media.each((image) =>{ %>
        <img src="<%- image.getURL() %>" alt="">
      <% }) %>
    </li>
  <% } %>
</ul>

<div id="occurrence-id"><%- obj.cid %> (<%- obj.id %>)</div>
