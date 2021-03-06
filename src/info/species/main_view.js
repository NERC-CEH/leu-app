/** ****************************************************************************
 * Home main view.
 **************************************************************************** */
/* eslint-disable */
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import appModel from 'app_model';
import JST from 'JST';
import 'jquery-touchswipe';
import Device from 'helpers/device';
import Gallery from '../../common/gallery';
import photosData from './data/images/metadata';
import './styles.scss';
import './data/images/loader';
import './data/thumbnails/loader';

export default Marionette.View.extend({
  template: JST['info/species/main'],

  events: {
    'click #gallery-button': 'photoView',
    'click .images .img': 'photoView',
  },

  onAttach() {
    // photos
    this.startSwipe();
  },

  serializeData() {
    let country = appModel.get('country');
    const isElsewhere = country === 'ELSEWHERE';
    if (isElsewhere) {
      country = 'UK';
    }

    const translateFn = p => t(p);
    const data = $.extend(
      true,
      {},
      this.model.attributes,
      this.model.attributes[country],
    );
    data.commonName = appModel.getSpeciesLocalName(this.model);
    data.food = data.food.map(translateFn).join('; ');
    data.habitat =
      data[country].habitat &&
      data[country].habitat.comment &&
      data[country].habitat.comment.map(translateFn).join('; ');
    data.plant =
      data[country].plant &&
      data[country].plant &&
      data[country].plant.map(translateFn).join('; ');
    data.overwintering = data[country].overwintering;
    data.comment = data[country].comment;
    data.pronotum = data.pronotum && data.pronotum.comment;
    data.size = data.size && data.size.comment;
    data.colour = data.colour && data.colour.comment;

    data.photos = photosData[data.id - 1].width.length;
    data.author = photosData[data.id - 1].author;
    return data;
  },

  startSwipe() {
    const that = this;
    const WIDTH = $('#species_gallery').width();
    let currentImg = 0;
    const maxImages = photosData[this.model.id - 1].width.length;
    const speed = 500;
    let imgs = null;

    /**
     * Catch each phase of the swipe.
     * move : we drag the div
     * cancel : we animate back to where we were
     * end : we animate to the next image
     */
    function swipeStatus(event, phase, direction, distance) {
      // If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
      if (phase === 'move' && (direction === 'left' || direction === 'right')) {
        const duration = 0;

        if (direction === 'left') {
          scrollImages(WIDTH * currentImg + distance, duration);
        } else if (direction == 'right') {
          scrollImages(WIDTH * currentImg - distance, duration);
        }
      } else if (phase === 'cancel') {
        scrollImages(WIDTH * currentImg, speed);
      } else if (phase === 'end') {
        if (direction === 'right') {
          previousImage();
        } else if (direction === 'left') {
          nextImage();
        }
      }
    }

    function previousImage() {
      currentImg = Math.max(currentImg - 1, 0);
      scrollImages(WIDTH * currentImg, speed);
      updateCircleProgress(currentImg);
    }

    function nextImage() {
      currentImg = Math.min(currentImg + 1, maxImages - 1);
      scrollImages(WIDTH * currentImg, speed);
      updateCircleProgress(currentImg);
    }

    /**
     * Manually update the position of the imgs on drag
     */
    function scrollImages(distance, duration) {
      imgs.css('transition-duration', `${(duration / 1000).toFixed(1)}s`);

      // inverse the number we set in the css
      const value = (distance < 0 ? '' : '-') + Math.abs(distance).toString();
      imgs.css('transform', `translate(${value}px,0)`);
    }

    function updateCircleProgress(number) {
      $progressCircles.each((id, circle) => {
        if ($(circle).data('id') !== number) {
          $(circle).removeClass('circle-full');
        } else {
          $(circle).addClass('circle-full');
        }
      });
    }

    const swipeOptions = {
      triggerOnTouchEnd: false,
      swipeStatus,
      allowPageScroll: 'vertical',
      threshold: 75,
    };

    const $img = $('#species_gallery .images .img');
    $img.css('width', WIDTH);

    const $progressCircles = this.$el.find('.gallery .progress div');

    $(() => {
      imgs = $('#species_gallery .images');
      imgs.width(maxImages * WIDTH);
      imgs.swipe(swipeOptions);

      /**
       * Tap handler for touchswipe does not work on Desktop computers -
       * it is always fired even if we are swiping.
       * Therfore, we disable gallery launch for non touch devices.
       */
      if (Device.isMobile()) {
        imgs.find('img').on('tap', () => {
          const id = $(this).data('id');
          that.showGallery(id);
        });
      }
    });
  },

  sample() {
    this.trigger('sample');
  },

  /**
   * Launches the species gallery viewing.
   */
  photoView() {
    const options = {};

    const photos = photosData[this.model.id - 1];
    const normalisedPhotosArray = photos.width.map((width, index) => ({
      author: photos.author[index],
      width: photos.width[index],
      height: photos.height[index],
    }));

    const items = normalisedPhotosArray.map((photo, index) => {
      let title;
      const { author, width, height } = photo;

      if (author) {
        title = `&copy; ${author}`;
      }

      return {
        src: `images/${this.model.id}_${index}.jpg`,
        w: width || 1024,
        h: height || 800,
        title,
      };
    });

    // Initializes and opens PhotoSwipe
    const gallery = new Gallery(items, options);
    gallery.init();
  },
});
