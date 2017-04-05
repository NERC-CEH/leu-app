<% if (obj.training) { %>
<div class="main-header training"><%= t('Training') %></div>
<% } %>
<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/taxon" id="species-button" class="navigate-right">
      <span class="media-object pull-left icon icon-species"></span>
      <% if (obj.commonName) { %>
      <span class="media-object pull-right descript"><%- obj.commonName %></span>
      <% } else { %>
      <span class="media-object pull-right descript warn"><%= t('required') %></span>
      <% } %>
      <%= t('Species') %>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/location" id="location-button" class="navigate-right">
      <span class="media-object pull-left icon icon-location"></span>

      <% if (obj.location_name) { %>
      <span class="media-object pull-right descript"> <%= obj.location_name %></span>
      <% } %>

      <% if (obj.location) { %>
      <span class="media-object pull-right descript"><%- obj.location %></span>
      <% } else { %>
      <% if (obj.isLocating) { %>
      <span class="media-object pull-right descript warn"><%= t('Locating...') %></span>
      <% } else { %>
      <span class="media-object pull-right descript warn"><%= t('required') %></span>
      <% } %>
      <% } %>
      <%= t('Location') %>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/date" id="date-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-calendar"></span>
      <span class="media-object pull-right descript"><%- obj.date %></span>
     <%= t('Date') %>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/number" id="number-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-number"></span>
      <span class="media-object pull-right descript"><%- obj.number %></span>
      <%= t('Number') %>
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/comment" id="comment-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-comment"></span>
      <span class="media-object pull-right descript"><%= obj.comment %></span>
      <%= t('Comment') %>
    </a>
  </li>
</ul>
