<a href="#info/species/<%- obj.id %>" class="species <%- obj.favourite ? 'favourite': '' %>">
  <div class="media-object pull-left" style="background-color: gray;background-image: url('images/<%= obj.id %>.jpg')"></div>
  <div class="media-body">
    <% if (obj.sortScientific) { %>
    <p class="species-list-main-name"><i><%- obj.taxon %></i></p>
    <p class="species-list-secondary-name">
      <%- obj.commonName %>
    </p>
    <% } else { %>
    <p class="species-list-main-name">
      <%- obj.commonName %>
    </p>
    <p class="species-list-secondary-name"><i><%- obj.taxon %></i></p>
    <% } %>
    <% if (obj.favourite) { %>
      <span class="favourite icon icon-heart-full"></span>
    <% } %>

    <% if (obj.form) { %>
      <p class="species-list-form"><i>f. <%- obj.form %></i></p>
    <% } %>

  </div>
</a>
