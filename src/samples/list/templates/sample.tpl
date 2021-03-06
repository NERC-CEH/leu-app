<a href="#samples/<%- obj.id %><%- obj.onDatabase ? '' : '/edit' %>" class="mobile">
    <% if (obj.training) { %>
    <div class="media-object pull-left training"></div>
    <% } %>
    <% if (obj.group) { %>
    <div class="media-object pull-left group"></div>
    <% } %>
    <div class="media-object pull-left photo"><%= obj.img %></div>
    <div class="pull-right">
      <% if (obj.saved) { %>
      <% if (obj.isSynchronising) { %>
      <div class="online-status icon icon-plus spin"></div>
      <% } else { %>
      <div class="online-status icon icon-send <%- obj.onDatabase ? 'cloud' : 'local' %>"></div>
      <% } %>
      <% } %>
    </div>

    <div class="media-body">
      <% if (obj.taxon) { %>
      <div class="species"> <%= obj.taxon %></div>
      <% } else { %>
      <div class="species error"><%= t('Species missing') %></div>
      <% } %>

      <div class="core">
        <% if (obj.date) { %>
        <span class="date"><%= obj.date %></span>
        <% } else { %>
        <span class="date error"><%= t('Date') %></span>
        <% } %>

        @

        <% if (!obj.location) { %>
          <% if (obj.isLocating) { %>
          <span class="location warn"><%= t('Locating...') %></span>
          <% } else { %>
          <span class="location error"><%= t('No location') %></span>
          <% } %>
        <% } else { %>
        <span class="location"><%= obj.location %></span>
        <% } %>
      </div>

      <div class="attributes">
        <div class="number"><%= obj.number %></div>
        <div class="stage"><%= obj.stage %></div>
        <div class="comment"><%= obj.comment %></div>
      </div>
    </div>
  </a>

  <div class="mobile-swipe-edit">
    <div id="delete" class="delete icon icon-delete"></div>
  </div>