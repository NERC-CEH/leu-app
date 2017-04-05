<div class="gallery" id="species_gallery">
  <div class="images">
    <% for (var i = 0; i < obj.photos; i++) { %>
    <div class="img photo" style="background-image: url('images/<%= obj.id + '_' + i + '.jpg' %>')" alt="&copy; <%= obj.author[i] %>"></div>
    <% } %>
  </div>
  <div class="progress">
    <% for (var i = 0; i < obj.photos; i++) { %>
    <div class="circle <%- i === 0 ? 'circle-full' : '' %>" data-id="<%- i %>"></div>
    <% } %>
  </div>
</div>

<ul id="species-info" class="table-view">
  <li>
    <div class="common-name"><%= t( obj.common_name ) %></div>
    <div class="taxon"><%= t( obj.taxon ) %></div>
  </li>

  <li>

    <% if (obj.name) { %>
    <p>
      <strong><%= t('Name') %>:</strong>
      <span><%= obj.name %></span>
    </p>
    <% } %>

    <% if (obj.form) { %>
    <p>
      <strong><%= t('Form') %>:</strong>
      <span><%= t( obj.form ) %></span>
    </p>
    <% } %>

    <% if (obj.size) { %>
    <p>
      <strong><%= t('Size') %>:</strong>
      <span><%= t( obj.size ) %></span>
    </p>
    <% } %>

    <% if (obj.colour) { %>
    <p>
      <strong><%= t('Colour') %>:</strong>
      <span><%= t( obj.colour ) %></span>
    </p>
    <% } %>


    <% if (obj.pronotum) { %>
    <p>
      <strong><%= t('Pronotum') %>:</strong>
      <span><%= t( obj.pronotum ) %></span>
    </p>
    <% } %>


    <% if (obj.melanic) { %>
    <p>
      <strong><%= t('Melanic') %>:</strong>
      <span><%= t( obj.melanic ) %></span>
    </p>
    <% } %>


    <% if (obj.spot_fusions) { %>
    <p>
      <strong><%= t('Spot fusions') %>:</strong>
      <span><%= t( obj.spot_fusions ) %></span>
    </p>
    <% } %>

    <% if (obj.leg) { %>
    <p>
      <strong><%= t('Leg') %>:</strong>
      <span><%= t( obj.leg ) %></span>
    </p>
    <% } %>

    <% if (obj.spots) { %>
    <p>
      <strong><%= t('Spots') %>:</strong>
      <span><%= t( obj.spots ) %></span>
    </p>
    <% } %>

    <% if (obj.food) { %>
    <p>
      <strong><%= t('Food') %>:</strong>
      <span><%= obj.food %></span>
    </p>
    <% } %>

    <% if (obj.habitat) { %>
    <p>
      <strong><%= t('Habitat') %>:</strong>
      <span><%= obj.habitat %></span>
    </p>
    <% } %>

    <% if (obj.plant) { %>
    <p>
      <strong><%= t('Plant') %>:</strong>
      <span><%= obj.plant %></span>
    </p>
    <% } %>
    <% if (obj.overwintering) { %>
    <p>
      <strong><%= t('Overwintering') %>:</strong>
      <span><%= t( obj.overwintering ) %></span>
    </p>
    <% } %>
    <% if (obj.comment) { %>
    <p>
      <strong><u><%= t('Note') %>:</u></strong>
      <span><%= t( obj.comment ) %></span>
    </p>
    <% } %>
  </li>
</ul>
