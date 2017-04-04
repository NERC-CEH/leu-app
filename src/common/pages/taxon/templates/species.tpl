<a href="#info/species/<%- obj.id %>" class="species <%- obj.favourite ? 'favourite': '' %>">
  <div class="media-object pull-left" style="background-color: gray;background-image: url('<%= obj.img %>')"></div>
  <div class="media-body">
    <% if (obj.sortScientific) { %>
    <p class="species-list-main-name"><i><%- obj.taxon %></i></p>
    <p class="species-list-secondary-name">
      <%- obj.common_name %>
    </p>
    <% } else { %>
    <p class="species-list-main-name">
      <%- obj.common_name %>
    </p>
    <p class="species-list-secondary-name"><i><%- obj.taxon %></i></p>
    <% } %>
    <% if (obj.favourite) { %>
      <span class="favourite icon icon-star"></span>
    <% } %>
  </div>
</a>