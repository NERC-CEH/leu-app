<div class="info-message">
  <p><%= t('We are trying to get your location. This might take a few minutes...') %></p>
  <% if (obj.accuracy) { %>
  <p><%= t('Accuracy') %>: <%- obj.accuracy %> m
    (< <%- obj.accuracyLimit %>m)</p>
  <% } %>
</div>

<div class="input-row tt">
  <label class="media-object pull-left icon icon-address"></label>
  <input class="typeahead" type="text" id="location-name" placeholder="<%= t('Nearest Named Place') %>" value="<%= obj.name %>"/>
</div>
<button id="gps-button" class="btn btn-narrow btn-positive btn-block">
  <span class="icon icon-plus icon-spin pull-right"></span>
  <%= t('Stop') %>
</button>

