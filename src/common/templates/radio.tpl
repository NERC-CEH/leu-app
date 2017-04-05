<% if (obj.message) { %>
<div class="info-message">
  <p><%= t( obj.message ) %></p>
</div>
<% } %>

<% obj.selection.forEach((option) => { %>
<label class="item item-radio">
  <input type="radio" name="group" value="<%= option %>" <%- option === obj.selected ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('${option}') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<% }) %>