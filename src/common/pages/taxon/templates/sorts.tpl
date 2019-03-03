<label class="item item-radio item-small">
  <input type="radio" name="group" value="default"
  <%- !_.keys(obj).length || obj['default'] ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('Default') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<label class="item item-radio item-small">
  <input type="radio" name="group" value="common"
  <%- obj['common'] ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('Common Name') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>

<label class="item item-radio item-small">
  <input type="radio" name="group" value="commonReverse"
  <%- obj['commonReverse'] ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('Common Name Reverse') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>

<label class="item item-radio item-small">
  <input type="radio" name="group" value="scientific"
  <%- obj['scientific'] ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('Scientific Name') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>

<label class="item item-radio item-small">
  <input type="radio" name="group" value="scientificReverse"
  <%- obj['scientificReverse'] ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      <%= t('Scientific Name Reverse') %>
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
