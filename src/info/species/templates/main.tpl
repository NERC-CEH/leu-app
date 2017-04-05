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

<div class="segmented-control no-border">
  <a id="gallery-button" class="control-item icon icon-camera">Gallery</a>
</div>

<ul id="species-info" class="table-view">
  <li>
    <div class="common-name"><%= obj.common_name %></div>
    <div class="taxon"><%= obj.taxon %></div>
  </li>

  <li>

    <% if (obj.name) { %>
    <p>
      <strong>Name:</strong>
      <span><%= obj.name %></span>
    </p>
    <% } %>

    <% if (obj.form) { %>
    <p>
      <strong>Form:</strong>
      <span><%= obj.form %></span>
    </p>
    <% } %>

    <% if (obj.size.comment) { %>
    <p>
      <strong>Size:</strong>
      <span><%= obj.size.comment %></span>
    </p>
    <% } %>

    <% if (obj.colour.comment) { %>
    <p>
      <strong>Colour:</strong>
      <span><%= obj.colour.comment %></span>
    </p>
    <% } %>


    <% if (obj.pronotum.comment) { %>
    <p>
      <strong>Pronotum:</strong>
      <span><%= obj.pronotum.comment %></span>
    </p>
    <% } %>



    <% if (obj.melanic) { %>
    <p>
      <strong>Melanic:</strong>
      <span><%= obj.melanic %></span>
    </p>
    <% } %>


    <% if (obj.spot_fusions) { %>
    <p>
      <strong>Spot fusions:</strong>
      <span><%= obj.spot_fusions %></span>
    </p>
    <% } %>

    <% if (obj.leg) { %>
    <p>
      <strong>Leg:</strong>
      <span><%= obj.leg %></span>
    </p>
    <% } %>

    <% if (obj.spots) { %>
    <p>
      <strong>Spots:</strong>
      <span><%= obj.spots %></span>
    </p>
    <% } %>

    <% if (obj.food) { %>
    <p>
      <strong>Food:</strong>
      <span><%= obj.food %></span>
    </p>
    <% } %>

    <% if (obj.habitat.comment) { %>
    <p>
      <strong>Habitat:</strong>
      <span><%= obj.habitat.comment %></span>
    </p>
    <% } %>
  </li>
</ul>
