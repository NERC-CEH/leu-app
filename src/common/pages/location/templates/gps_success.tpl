<div class="success-message">
  <p><%= t('Success!') %></p>
  <p><%= t('Accuracy') %>: <%- obj.accuracy %> m</p>
</div>

<div class="input-row tt">
  <label class="media-object pull-left icon icon-address"></label>
  <input class="typeahead" type="text" id="location-name" placeholder="<%= t('Nearest Named Place') %>" value="<%= obj.name %>"/>
</div>

<button id="gps-button"
        class="btn btn-narrow btn-positive btn-block"><%= t('Refresh GPS') %></button>

