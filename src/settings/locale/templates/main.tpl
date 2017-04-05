<div class="info-message">
  <p>Please select your country</p>
</div>
<div class="list">
  <label class="item item-radio">
    <input type="radio" name="group" value="UK"
    <%- !_.keys(obj).length || obj['UK'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        United Kingdom
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="SK"
    <%- obj['SK'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Slovensko
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="CZ"
    <%- obj['CZ'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Česká republika
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="IT"
    <%- obj['IT'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Italia
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="PT"
    <%- obj['PT'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        República Portuguesa
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
  <label class="item item-radio">
    <input type="radio" name="group" value="BE"
    <%- obj['BE'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        Belgique / België
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
  </label>
</div>
