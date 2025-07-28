import { v4 as uuid } from 'uuid';

//models
import backpack_model from '../Pages/Customize/Configurator/models/Accessories/Unisex/backpack.glb';
import mini_bag_model from '../Pages/Customize/Configurator/models/Accessories/Unisex/mini_bag_handle_main_body.glb';
import sash_model from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash.glb';
import sash_model_new from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_new.glb';
import sash_model_two from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_two.glb';
import sash_both_down from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_both_down.glb';
import sash_with_image from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_with_picture.glb';
import sash_one_top_one_down from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_one_top_one_down.glb';
import sash_striped_edge from '../Pages/Customize/Configurator/models/Accessories/Unisex/sash_striped_edge.glb';

import jacket from '../Pages/Customize/Configurator/models/Accessories/Unisex/jacket_main.glb';
import bangles_model from '../Pages/Customize/Configurator/models/Accessories/Unisex/bangles.glb';
import bangles_model_no_name_board from '../Pages/Customize/Configurator/models/Accessories/Unisex/bangles_no_name_board.glb';
import bangles_variant_three from '../Pages/Customize/Configurator/models/Accessories/Unisex/bangles_variant_three.glb';
import earring_model from '../Pages/Customize/Configurator/models/Accessories/Unisex/earring.glb';
import bikini from '../Pages/Customize/Configurator/models/Accessories/bikini.glb';
import nails_model from '../Pages/Customize/Configurator/models/Accessories/nails.glb';
import coffin_nails_model from '../Pages/Customize/Configurator/models/Accessories/coffin_nails.glb';
import round_nails_model from '../Pages/Customize/Configurator/models/Accessories/round_nails.glb';
import stilletto_nails_model from '../Pages/Customize/Configurator/models/Accessories/stilletto_nails.glb';
import almond_nails_model from '../Pages/Customize/Configurator/models/Accessories/almond_nails.glb';
import square_nails_model from '../Pages/Customize/Configurator/models/Accessories/square_nails.glb';

// Importing size guides
const sash_guide = '/assets/size_guide/Unisex/the_sash.jpg';
const miniBag_guide = '/assets/size_guide/Unisex/30.jpg';
const backpack_guide = '/assets/size_guide/Unisex/29.jpg';
const jacket_guide = '/assets/size_guide/Unisex/35.jpg';
const bikini_guide = '/assets/size_guide/Accessories/Female/31.jpg';
const earring_guide = '/assets/size_guide/Unisex/earring size chart.jpg';
const bangle_guide = '/assets/size_guide/Unisex/bracelet size chart.jpg';
const hair_guide = '/assets/size_guide/Unisex/hair length.png';
// const bob_wig_length = "/assets/size_guide/Unisex/bob wig length size guide.jpg";
const nail_guide = '/assets/size_guide/Unisex/nail length guide.jpg';

// other hair guides
export const hair_guide_braziian =
  '/assets/size_guide/Unisex/hair/brazilian_page-0001 (1).jpg';
export const hair_guide_cambodia =
  '/assets/size_guide/Unisex/hair/cambodia_page-0001 (1).jpg';
export const hair_guide_indian =
  '/assets/size_guide/Unisex/hair/indian_page-0001 (1).jpg';
export const hair_guide_malasian =
  '/assets/size_guide/Unisex/hair/malasian_page-0001 (1) (1).jpg';
export const hair_guide_peruvian =
  '/assets/size_guide/Unisex/hair/peruvian_page-0001 (1) (1).jpg';
export const hair_guide_mongoloian =
  '/assets/size_guide/Unisex/hair/mongolian_page-0001 (1).jpg';
export const hair_guide_synthethic =
  '/assets/size_guide/Unisex/hair/synthetic_page-0001 (1).jpg';
export const hair_guide_capSize = '/assets/size_guide/Unisex/hair/cap size.jpg';
export const hair_guide_frontal =
  '/assets/size_guide/Unisex/hair/fwrite_page-0002 (1)-imageonline.co-merged.png';
export const hair_guide_density = '/assets/size_guide/Unisex/hair/density.png';
export const hair_guide_texture =
  '/assets/size_guide/Unisex/hair/texture (2).jpg';

// other nail guides
export const nail_guide_type =
  '/assets/size_guide/Unisex/nail/type of nails_page-0001 (1).jpg';

const image_waist_bag = '/assets/welcome_3ds/others/waist bag.jpg';
const image_jacket = '/assets/welcome_3ds/others/jacket.png';
const image_backpack = '/assets/welcome_3ds/others/backpack.png';
const image_sash = '/assets/welcome_3ds/others/sash.jpg';
const bangles = '/assets/welcome_3ds/others/bead_one.png';
const bangles_two = '/assets/welcome_3ds/others/bangles_two.png';
const earring = '/assets/welcome_3ds/others/earring.jpg';
const image_bikini = '/assets/welcome_3ds/female/bikini.png';
const image_sash_logos_both_down =
  '/assets/welcome_3ds/others/sash_both_logos_down.jpg';
const image_sash_logos_one_up_one_down =
  '/assets/welcome_3ds/others/sash_one_up_one_down.png';
const image_sash_with_images = '/assets/welcome_3ds/others/sash_with_image.jpg';
const image_sash_striped_edge =
  '/assets/welcome_3ds/others/sash_with_edges.png';

const image_confirm_1 = '/assets/raw3ds/sash1.png';
const image_confirm_2 = '/assets/raw3ds/sash2.png';
const image_confirm_3 = '/assets/raw3ds/sash3.png';
const image_confirm_4 = '/assets/raw3ds/sash4.png';
const image_confirm_5 = '/assets/raw3ds/sash5.png';

//box braid
const box_braid =
  '/assets/welcome_3ds/others/Wig/box_braid/profile pic_  Box Braid Wig with Curly End.png';
const box_braid_black = '/assets/welcome_3ds/others/Wig/box_braid/black.png';
const box_braid_grey = '/assets/welcome_3ds/others/Wig/box_braid/grey.png';
const box_braid_brown = '/assets/welcome_3ds/others/Wig/box_braid/brown.png';
const box_braid_wine = '/assets/welcome_3ds/others/Wig/box_braid/wine.png';

// body wave
const body_wave_profile =
  '/assets/welcome_3ds/others/Wig/body_wave/body wavee.jpg';
const BL_66040_1 = '/assets/welcome_3ds/others/Wig/body_wave/BL_66040-1-.png';
const BL_11017_1 = '/assets/welcome_3ds/others/Wig/body_wave/BL11017-1-.png';
// const BL_11018_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL11018-1-.png";
const BL_11026_1 = '/assets/welcome_3ds/others/Wig/body_wave/BL11026-1.png';
const BL_11036_1 = '/assets/welcome_3ds/others/Wig/body_wave/BL11036-1-.png';
// const BL_66010_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66010-1.png";
// const BL_66060_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66060-1-.png";
// const BL_66069_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66069-1-.png";
// const BL_66084_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66084-1.png";
// const BL_66110_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66110-1-.png";
// const BL_66111_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66111-1-.png";
// const BL_66122_1 = "/assets/welcome_3ds/others/Wig/body_wave/BL66122-1-.png";

//bone straight
const bone_staright_profile =
  '/assets/welcome_3ds/others/Wig/bone straight/bone straigt.jpg';
const burgary =
  '/assets/welcome_3ds/others/Wig/bone straight/burgandy_bone_straight-removebg-preview.png';
const blonde =
  '/assets/welcome_3ds/others/Wig/bone straight/blonde_bone__straight-removebg-preview.png';
const natural =
  '/assets/welcome_3ds/others/Wig/bone straight/natural_black_bone_straight-removebg-preview.png';
const brown =
  '/assets/welcome_3ds/others/Wig/bone straight/brown_bone__straight-removebg-preview.png';

//deep wave
const deepWavebrown =
  '/assets/welcome_3ds/others/Wig/deep_wave/brown_deep_wave-removebg-preview.png';
const deepWaveblonde_ombre =
  '/assets/welcome_3ds/others/Wig/deep_wave/blond_ombre_deep_wave-removebg-preview.png';
const deepWaveNatural =
  '/assets/welcome_3ds/others/Wig/deep_wave/natural_black_deep_wave-removebg-preview.png';
const deepWaveHoneyBlondeOmbre =
  '/assets/welcome_3ds/others/Wig/deep_wave/honey_blonde_ombre_deepp_wave-removebg-preview.png';
const deep_wave_profile =
  '/assets/welcome_3ds/others/Wig/deep_wave/deep wavee.jpg';

//straight hair
const straight_profile =
  '/assets/welcome_3ds/others/Wig/straight_hair/straigt.jpg';
const straight_blonde =
  '/assets/welcome_3ds/others/Wig/straight_hair/blonde straight.png';
const straight_black =
  '/assets/welcome_3ds/others/Wig/straight_hair/natural black straight.png';
const straight_highlights =
  '/assets/welcome_3ds/others/Wig/straight_hair/Honey Blonde Highlight straight.png';

//jerry curl
const jerry_black =
  '/assets/welcome_3ds/others/Wig/jerry_curl/black-jerry-curl-removebg-preview.png';
const jerry_burgundy =
  '/assets/welcome_3ds/others/Wig/jerry_curl/burgandy-jerry-curl-webp-removebg-preview.png';
const jerry_ombre =
  '/assets/welcome_3ds/others/Wig/jerry_curl/ombre_jerry-curl-removebg-preview.png';
const jerry_profile =
  '/assets/welcome_3ds/others/Wig/jerry_curl/jerry curll.jpg';

//pixie curl
const pixie_profile = '/assets/welcome_3ds/others/Wig/pixie_curl/pixie.jpg';
const pixie_black =
  '/assets/welcome_3ds/others/Wig/pixie_curl/natural_black_pixie_curl-removebg-preview.png';
const pixie_ombre =
  '/assets/welcome_3ds/others/Wig/pixie_curl/ombre_pixie_curl-removebg-preview.png';

//specila sashes
const sash1_front = '/assets/special_sashes/1.1.jpg';
const sash1_actual = '/assets/special_sashes/1.2.jpg';

const sash2_front = '/assets/special_sashes/2.1.jpg';
const sash2_actual = '/assets/special_sashes/2.2.jpg';

const sash3_front = '/assets/special_sashes/3.1.jpg';
const sash3_actual = '/assets/special_sashes/3.2.jpg';

const sash4_front = '/assets/special_sashes/4.1.jpg';
const sash4_actual = '/assets/special_sashes/4.2.jpg';

const sash5_front = '/assets/special_sashes/5.1.jpg';
const sash5_actual = '/assets/special_sashes/5.2.jpg';

const sash6_front = '/assets/special_sashes/6.1.jpg';
const sash6_actual = '/assets/special_sashes/6.2.jpg';

const sash7_front = '/assets/special_sashes/7.1.jpg';
const sash7_actual = '/assets/special_sashes/7.2.jpg';

const sash8_front = '/assets/special_sashes/8.1.jpg';
const sash8_actual = '/assets/special_sashes/8.2.jpg';

const sash9_front = '/assets/special_sashes/9.1.jpg';
const sash9_actual = '/assets/special_sashes/9.2.jpg';

// const sash10_front = "/assets/special_sashes/10.1.jpg";
// const sash10_actual = "/assets/special_sashes/10.2.jpg";

const sash11_front = '/assets/special_sashes/11.1.jpg';
const sash11_actual = '/assets/special_sashes/11.2.jpg';

const sash12_front = '/assets/special_sashes/12.1.jpg';
const sash12_actual = '/assets/special_sashes/12.2.jpg';

const sash13_front = '/assets/special_sashes/13.1.jpg';
const sash13_actual = '/assets/special_sashes/13.2.jpg';

const sash14_front = '/assets/special_sashes/14.1.jpg';
const sash14_actual = '/assets/special_sashes/14.2.jpg';

const sash15_front = '/assets/special_sashes/15.1.jpg';
const sash15_actual = '/assets/special_sashes/15.2.jpg';

const sash16_front = '/assets/special_sashes/16.1.jpg';
const sash16_actual = '/assets/special_sashes/16.2.jpg';

const sash17_front = '/assets/special_sashes/17.1.jpg';
const sash17_actual = '/assets/special_sashes/17.2.jpg';

const sash18_front = '/assets/special_sashes/18.1.jpg';
const sash18_actual = '/assets/special_sashes/18.2.jpg';

const sash19_front = '/assets/special_sashes/19.1.jpg';
const sash19_actual = '/assets/special_sashes/19.2.jpg';

const sash20_front = '/assets/special_sashes/20.1.jpg';
const sash20_actual = '/assets/special_sashes/20.2.jpg';

const sash21_front = '/assets/special_sashes/21.1.jpg';
const sash21_actual = '/assets/special_sashes/21.2.jpg';

const sash22_front = '/assets/special_sashes/22.1.jpg';
const sash22_actual = '/assets/special_sashes/22.2.jpg';

const sash23_front = '/assets/special_sashes/23.1.jpg';
const sash23_actual = '/assets/special_sashes/23.2.jpg';

const isMobile = window.innerWidth < 768;

export const specialSash = [
  {
    id: uuid(),
    name: 'Sash One',
    title: 'Sash One',
    description: '',
    image: sash1_front,
    model: sash1_actual,
    confirm_image: sash1_actual,
    positioningLeft: {
      text: {
        top: '-1.5rem',
        left: '-5.5rem',
        height: '12rem',
        width: '5.4rem',
        lineHeight: '',
      },
      image: {
        top: '-8.5rem',
        left: '-4.5rem',
        height: '3rem',
        width: '3rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1.8rem',
        left: '0.5rem',
        height: '12rem',
        width: '5.4rem',
        lineHeight: '',
      },
      image: {
        top: '-8.5rem',
        left: '2rem',
        height: '3rem',
        width: '3rem',
      },
    },
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.6,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Two',
    title: 'Sash Two',
    description: '',
    image: sash2_front,
    model: sash2_actual,
    confirm_image: sash2_actual,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-2.2rem',
        left: '-2rem',
        height: '12rem',
        width: '4.4rem',
        lineHeight: '',
      },
      image: {
        top: '-8.5rem',
        left: '-1rem',
        height: '2.4rem',
        width: '2.4rem',
      },
    },
    positioningRight: {
      text: {
        top: '-3.2rem',
        left: '2.8rem',
        height: '12rem',
        width: '4.2rem',
        lineHeight: '',
      },
      image: {
        top: '-8.5rem',
        left: '4.3rem',
        height: '2.4rem',
        width: '2.4rem',
      },
    },
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.6,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },

  {
    id: uuid(),
    name: 'Sash Three',
    title: 'Sash Three',
    description: '',
    image: sash3_front,
    model: sash3_actual,
    confirm_image: sash3_actual,
    positioningLeft: {
      text: {
        top: '-0.7rem',
        left: '-5.7rem',
        height: '13rem',
        width: '3.8rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '-5.6rem',
        height: '3rem',
        width: '3rem',
      },
    },
    positioningRight: {
      text: {
        top: '-0.7rem',
        left: '-0.5rem',
        height: '12rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '0.3rem',
        height: '3rem',
        width: '3rem',
      },
    },
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.6,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },

  {
    id: uuid(),
    name: 'Sash Four',
    title: 'Sash Four',
    description: '',
    image: sash4_front,
    model: sash4_actual,
    confirm_image: sash4_actual,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1.2rem',
        left: '-4.6rem',
        height: '12rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '-4rem',
        height: '2.4rem',
        width: '2.4rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1.2rem',
        left: '0.3rem',
        height: '12rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-6.5rem',
        left: '0.7rem',
        height: '2.4rem',
        width: '2.4rem',
      },
    },
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.6,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },

  {
    id: uuid(),
    name: 'Sash Five',
    title: 'Sash Five',
    description: '',
    image: sash5_front,
    model: sash5_actual,
    confirm_image: sash5_actual,
    positioningLeft: {
      text: {
        top: '-1rem',
        left: '-3.8rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '2.4rem',
      },
      image: {
        top: '-5.8rem',
        left: '-3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-0.5rem',
        left: '1.5rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '2.4rem',
      },
      image: {
        top: '-5.4rem',
        left: '2.5rem',
        height: '1.7rem',
        width: '1.7rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.7,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },

  {
    id: uuid(),
    name: 'Sash Six',
    title: 'Sash Six',
    description: '',
    image: sash6_front,
    model: sash6_actual,
    confirm_image: sash6_actual,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-2.6rem',
        left: '-6.6rem',
        height: '12rem',
        width: '4.6rem',
        lineHeight: '',
      },
      image: {
        top: '-11.3rem',
        left: '-5.5rem',
        height: '2.8rem',
        width: '2.8rem',
      },
    },
    positioningRight: {
      text: {
        top: '-2.6rem',
        left: '-0.3rem',
        height: '12rem',
        width: '4.3rem',
        lineHeight: '',
      },
      image: {
        top: '-11.3rem',
        left: '0.5rem',
        height: '2.8rem',
        width: '2.8rem',
      },
    },
    otherYards: { small: 2, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.65,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Seven',
    title: 'Sash Seven',
    description: '',
    image: sash7_front,
    model: sash7_actual,
    confirm_image: sash7_actual,
    positioningLeft: {
      text: {
        top: '-1.2rem',
        left: '-3.5rem',
        height: '8rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '-3.3rem',
        height: '2.5rem',
        width: '2.5rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1.2rem',
        left: '0.2rem',
        height: '8rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '1rem',
        height: '2.3rem',
        width: '2.3rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.7,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Eight',
    title: 'Sash Eight',
    description: '',
    image: sash8_front,
    model: sash8_actual,
    confirm_image: sash8_actual,
    positioningLeft: {
      text: {
        top: '-2rem',
        left: '-5rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '2.4rem',
      },
      image: {
        top: '-9rem',
        left: '-4.5rem',
        height: '2.5rem',
        width: '2.5rem',
      },
    },
    positioningRight: {
      text: {
        top: '-2.6rem',
        left: '-0.6rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '2.4rem',
      },
      image: {
        top: '-9.3rem',
        left: '0.4rem',
        height: '2.5rem',
        width: '2.5rem',
      },
    },
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.65,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Nine',
    title: 'Sash Nine',
    description: '',
    image: sash9_front,
    model: sash9_actual,
    confirm_image: sash9_actual,
    positioningLeft: {
      text: {
        top: '-1.5rem',
        left: '-4.6rem',
        height: '10rem',
        width: '4rem',
        lineHeight: '',
      },
      image: {
        top: '-8.5rem',
        left: '-4rem',
        height: '2.5rem',
        width: '2.5rem',
      },
    },
    positioningRight: {
      text: {
        top: '-2.5rem',
        left: '1.2rem',
        height: '12rem',
        width: '4rem',
        lineHeight: '',
      },
      image: {
        top: '-9.2rem',
        left: '1.6rem',
        height: '2.5rem',
        width: '2.5rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.65,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Sash Ten",
  //   title: "Sash Ten",
  //   description: "",
  //   image: sash10_front,
  //   model: sash10_actual,
  //   confirm_image: sash10_actual,
  //   positioningLeft: {
  //     text: {
  //       top: "2rem",
  //       left: "-6.5rem",
  //       height: "13rem",
  //       width: "5.2rem",
  //       lineHeight: "",
  //     },
  //     image: {
  //       top: "-5rem",
  //       left: "-3.5rem",
  //       height: "3rem",
  //       width: "3rem",
  //     }
  //   },
  //   positioningRight: {
  //     text: {
  //       top: "2rem",
  //       left: "1.5rem",
  //       height: "13rem",
  //       width: "5.2rem",
  //       lineHeight: "",
  //     },
  //     image: {
  //       top: "-5rem",
  //       left: "3.5rem",
  //       height: "3rem",
  //       width: "3rem",
  //     }
  //   },
  //   otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
  //   myZoom: 0.7,
  //   price: 75,
  //   readyIn: 7,
  //   sizeGuide: sash_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  // },
  {
    id: uuid(),
    name: 'Sash Ten',
    title: 'Sash Ten',
    description: '',
    image: sash11_front,
    model: sash11_actual,
    confirm_image: sash11_actual,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1rem',
        left: '-3.4rem',
        height: '8rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '-2.8rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1rem',
        left: '1rem',
        height: '8rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '1.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.7,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Eleven',
    title: 'Sash Eleven',
    description: '',
    image: sash12_front,
    model: sash12_actual,
    confirm_image: sash12_actual,
    positioningLeft: {
      text: {
        top: '-0.8rem',
        left: '-3.4rem',
        height: '9rem',
        width: '3.4rem',
        lineHeight: '',
      },
      image: {
        top: '-6rem',
        left: '-2.7rem',
        height: '2.2rem',
        width: '2.2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-0.8rem',
        left: '0.2rem',
        height: '9rem',
        width: '3.4rem',
        lineHeight: '',
      },
      image: {
        top: '-6rem',
        left: '1rem',
        height: '2.2rem',
        width: '2.2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.7,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Twelve',
    title: 'Sash Twelve',
    description: '',
    image: sash13_front,
    model: sash13_actual,
    confirm_image: sash13_actual,
    positioningLeft: {
      text: {
        top: '-2rem',
        left: '-4rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '-3.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-2rem',
        left: '0.5rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '1.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.75,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Thirteen',
    title: 'Sash Thirteen',
    description: '',
    image: sash14_front,
    model: sash14_actual,
    confirm_image: sash14_actual,
    positioningLeft: {
      text: {
        top: '-0.4rem',
        left: '-4.6rem',
        height: '9rem',
        width: '3.2rem',
        lineHeight: '',
      },
      image: {
        top: '-5.4rem',
        left: '-4rem',
        height: '2.2rem',
        width: '2.2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-0.4rem',
        left: '1rem',
        height: '9rem',
        width: '3.2rem',
        lineHeight: '',
      },
      image: {
        top: '-5.3rem',
        left: '1rem',
        height: '2.2rem',
        width: '2.2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.75,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Fourteen',
    title: 'Sash Fourteen',
    description: '',
    image: sash15_front,
    model: sash15_actual,
    confirm_image: sash15_actual,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1.5rem',
        left: '-4.8rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '-4.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1.5rem',
        left: '-0.7rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '-0.3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 5 },
    myZoom: 0.8,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Fifteen',
    title: 'Sash Fifteen',
    description: '',
    image: sash16_front,
    model: sash16_actual,
    confirm_image: sash16_actual,
    scale: 1.2,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1rem',
        left: '-4rem',
        height: '10rem',
        width: '4rem',
        lineHeight: '2rem',
      },
      image: {
        top: '-7rem',
        left: '-3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1rem',
        left: '0.1rem',
        height: '10rem',
        width: '4rem',
        lineHeight: '2rem',
      },
      image: {
        top: '-7rem',
        left: '1.2rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 6 },
    myZoom: 0.85,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Sixteen',
    title: 'Sash Sixteen',
    description: '',
    image: sash17_front,
    model: sash17_actual,
    confirm_image: sash17_actual,
    scale: 1.2,
    positioningLeft: {
      text: {
        top: '0.3rem',
        left: '-4.5rem',
        height: '8rem',
        width: '4.2rem',
        lineHeight: '2rem',
      },
      image: {
        top: '-5.5rem',
        left: '-3.5rem',
        height: '1.7rem',
        width: '1.7rem',
      },
    },
    positioningRight: {
      text: {
        top: '0.3rem',
        left: '-0.1rem',
        height: '8rem',
        width: '4.2rem',
        lineHeight: '2rem',
      },
      image: {
        top: '-5.5rem',
        left: '1rem',
        height: '1.7rem',
        width: '1.7rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 5, extraExtraLarge: 6 },
    myZoom: 0.9,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Seventeen',
    title: 'Sash Seventeen',
    description: '',
    image: sash18_front,
    model: sash18_actual,
    confirm_image: sash18_actual,
    scale: 1.5,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-2.2rem',
        left: '-5rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-9.6rem',
        left: '-5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-2.2rem',
        left: '-0.1rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-10rem',
        left: '0.4rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
    myZoom: 0.95,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Sash Eighteen",
  //   title: "Sash Eighteen",
  //   description: "",
  //   image: sash19_front,
  //   model: sash19_actual,
  //   confirm_image: sash19_actual,
  //   scale: 1.5,
  //   positioningLeft: {
  //     text: {
  //       top: "6rem",
  //       left: "-9.5rem",
  //       height: "16.5rem",
  //       width: "8rem",
  //       lineHeight: "",
  //     },
  //     image: {
  //       top: "-8.5rem",
  //       left: "-6.5rem",
  //       height: "5rem",
  //       width: "5rem",
  //     }
  //   },
  //   positioningRight: {
  //     text: {
  //       top: "6rem",
  //       left: "5.5rem",
  //       height: "16.5rem",
  //       width: "8rem",
  //       lineHeight: "",
  //     },
  //     image: {
  //       top: "-8.5rem",
  //       left: "7rem",
  //       height: "5rem",
  //       width: "5rem",
  //     }
  //   },
  //   otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
  //   myZoom: 1,
  //   price: 75,
  //   readyIn: 7,
  //   sizeGuide: sash_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  // },
  {
    id: uuid(),
    name: 'Sash Eighteen',
    title: 'Sash Eighteen',
    description: '',
    image: sash20_front,
    model: sash20_actual,
    confirm_image: sash20_actual,
    scale: 1.5,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1.2rem',
        left: '-4rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7.6rem',
        left: '-3.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1.2rem',
        left: '0.3rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-7.6rem',
        left: '1.3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
    myZoom: 1.05,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Nineteen',
    title: 'Sash Nineteen',
    description: '',
    image: sash21_front,
    model: sash21_actual,
    confirm_image: sash21_actual,
    scale: 1.5,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1rem',
        left: '-4.1rem',
        height: '9rem',
        width: '4rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '-3.3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1rem',
        left: '0.3rem',
        height: '9rem',
        width: '4rem',
        lineHeight: '',
      },
      image: {
        top: '-7rem',
        left: '1rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
    myZoom: 1.1,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Twenty',
    title: 'Sash Twenty',
    description: '',
    image: sash22_front,
    model: sash22_actual,
    confirm_image: sash22_actual,
    scale: 2,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '-1rem',
        left: '-5rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '-4.3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '-1rem',
        left: '-0.4rem',
        height: '9rem',
        width: '3.5rem',
        lineHeight: '',
      },
      image: {
        top: '-8rem',
        left: '0.1rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
    myZoom: 1.15,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
  {
    id: uuid(),
    name: 'Sash Twenty-One',
    title: 'Sash Twenty-One',
    description: '',
    image: sash23_front,
    model: sash23_actual,
    confirm_image: sash23_actual,
    scale: 2,
    textColor: 'white',
    positioningLeft: {
      text: {
        top: '1rem',
        left: '-2.8rem',
        height: '9rem',
        width: '3.8rem',
        lineHeight: '',
      },
      image: {
        top: '-5.5rem',
        left: '-2.5rem',
        height: '2rem',
        width: '2rem',
      },
    },
    positioningRight: {
      text: {
        top: '0.1rem',
        left: '2.5rem',
        height: '9rem',
        width: '3.8rem',
        lineHeight: '',
      },
      image: {
        top: '-6.5rem',
        left: '3rem',
        height: '2rem',
        width: '2rem',
      },
    },
    otherYards: { small: 3, large: 4, extraLarge: 6, extraExtraLarge: 7 },
    myZoom: 1.2,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
  },
];

export const mainUnisex = [
  {
    id: uuid(),
    name: 'Square Nails',
    link: '/configurator-nails/Square Nails',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/273912377-372031824314185-6626888513630609174-n-1676653877.jpg',
    model: square_nails_model,
    myNode: [
      { name: 'nails', yardNeeded: 1 },
      // { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.45,
    sizeGuide: nail_guide,
    price: 10,
    readyIn: 7,
  },
  // {
  //   id: uuid(),
  //   name: "Coffin Nails",
  //   link: "/configurator-nails/Coffin Nails",
  //   image:
  //     "https://www.byrdie.com/thmb/nm8BSffq7U2t9kXFFOvjmgnjxRo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/91571257_1539518826223868_2434414556032171702_n-8f4c117bc3a640d8b3e3b4988b3aeaf5.jpg",
  //   model: nails_model,
  //   myNode: [
  //     { name: "nails", yardNeeded: 1 },
  //     { name: "nailHands", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 0.5,
  //   price: 10,
  //   readyIn: 7,
  //   sizeGuide: nail_guide,
  // },

  {
    id: uuid(),
    name: 'Oval Nails',
    link: '/configurator-nails/Oval Nails',
    image:
      'https://stylemissus.com/cdn/shop/products/product-image-1295848768.jpg?v=1584041580',
    model: round_nails_model,
    myNode: [
      { name: 'nails', yardNeeded: 1 },
      // { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.45,
    price: 10,
    readyIn: 7,
    sizeGuide: nail_guide,
  },
  {
    id: uuid(),
    name: 'Stiletto Nails',
    link: '/configurator-nails/Stiletto Nails',
    image:
      'https://naildesignsjournal.com/wp-content/uploads/2022/03/nude-stiletto-nails-trends-super-long.jpg',
    model: stilletto_nails_model,
    myNode: [
      { name: 'nails', yardNeeded: 1 },
      // { name: "nailHands", yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.45,
    price: 10,
    readyIn: 7,
    sizeGuide: nail_guide,
  },
  {
    id: uuid(),
    name: 'Spiral Curls Braids Wig',
    // image: box_braid,
    image:
      'https://i.etsystatic.com/23022969/r/il/d63d4a/2662177642/il_570xN.2662177642_cn66.jpg',
    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Spiral Curls Braids Wig',
    colorVariants: [
      box_braid_black,
      box_braid_grey,
      box_braid_brown,
      box_braid_wine,
    ],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: 'Straight Hair Wig',
    image: straight_profile,

    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Straight Hair Wig',
    colorVariants: [straight_black, straight_blonde, straight_highlights],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: 'Jerry Curl Wig',
    image: jerry_profile,

    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Jerry Curl Wig',
    colorVariants: [jerry_black, jerry_burgundy, jerry_ombre],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: 'Body Wave Wig',
    image: body_wave_profile,
    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Body Wave Wig',
    colorVariants: [
      BL_66040_1,
      BL_11017_1,
      // BL_11018_1,
      BL_11026_1,
      BL_11036_1,
      // BL_66010_1,
      // BL_66060_1,
      // BL_66069_1,
      // BL_66084_1,
      // BL_66110_1,
      // BL_66111_1,
      // BL_66122_1,
    ],
    sizeGuide: hair_guide,
  },
  {
    id: uuid(),
    name: 'Bone Straight Wig',
    image: bone_staright_profile,

    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Bone Straight Wig',
    colorVariants: [natural, burgary, blonde, brown],
    sizeGuide: '',
  },
  {
    id: uuid(),
    name: 'Deep Wave Wig',
    image: deep_wave_profile,
    price: 100,
    readyIn: 7,
    link: '/configurator-wig/Deep Wave Wig',
    colorVariants: [
      deepWaveNatural,
      deepWavebrown,
      deepWaveblonde_ombre,
      deepWaveHoneyBlondeOmbre,
    ],
    sizeGuide: '',
  },
  // {
  //   id: uuid(),
  //   name: "Deep Wave Wig",
  //   image: deep_wave_profile,
  //   price: 100,
  //   readyIn: 7,
  //   link: "/configurator-wig/Deep Wave Wig",
  //   colorVariants: [
  //     deepWaveNatural,
  //     deepWavebrown,
  //     deepWaveblonde_ombre,
  //     deepWaveHoneyBlondeOmbre,
  //   ],
  //   sizeGuide: "",
  // },
  // {
  //   id: uuid(),
  //   name: "Pixie Curl Wig",
  //   image: pixie_profile,
  //   price: 100,
  //   readyIn: 7,
  //   link: "/configurator-wig/Pixie Curl Wig",
  //   colorVariants: [pixie_black, pixie_ombre],
  //   sizeGuide: "",
  // },

  // {
  //   id: uuid(),
  //   name: "Jacket",
  //   image: image_jacket,
  //   model: jacket,
  //   myNode: [
  //     { name: "torso", yardNeeded: 2 },
  //     { name: "hands", yardNeeded: 1 },
  //     { name: "buttons", yardNeeded: 1 },
  //   ],
  //   myZoom: 0.9,
  //   price: 55,
  //   sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeGuide: jacket_guide,
  //   sizeOptions: [
  //     // { label: "XS", value: 0.5 },
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //     { label: "XL", value: 3 },
  //     { label: "2XL", value: 4 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Shoulder (cm)",
  //     },
  //     {
  //       label: "Chest (cm)",
  //     },
  //     {
  //       label: "Body Length (cm)",
  //     },
  //     {
  //       label: "Sleeve Length(cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
  {
    id: uuid(),
    name: 'Logo Up, Text Down Sash',
    title: 'Sash Variant 1',
    description:
      'This sash allows logos/designs at the top and text at the bottom on either side',
    image: image_sash,
    model: sash_model,
    confirm_image: image_confirm_1,
    myNode: [
      { name: 'plain_sections', yardNeeded: 1 },
      { name: 'Stripe_1', yardNeeded: 1 },
      { name: 'Stripe_2', yardNeeded: 1 },
      { name: 'mid_stripes', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 75,
    // sizeModels: tshirt_model,
    readyIn: 7,
    weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
      },
      {
        label: 'Width (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Text Up, Logo Down Sash',
    title: 'Sash Variant 2',
    description:
      'This sash allows logos/designs at the bottom and text at the top on either side',
    image: image_sash_logos_both_down,
    model: sash_both_down,
    confirm_image: image_confirm_2,
    myNode: [
      { name: 'plain_section', yardNeeded: 1 },
      { name: 'stripe_1', yardNeeded: 1 },
      { name: 'stripe_2', yardNeeded: 1 },
      { name: 'mid_stripes', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 75,
    readyIn: 7,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
      },
      {
        label: 'Width (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Contrasting Logo and Text Sash',
    title: 'Sash Variant 3',
    description:
      'This sash has logos/design positions contrasting with text on either side',
    image: image_sash_logos_one_up_one_down,
    model: sash_striped_edge,
    confirm_image: image_confirm_3,
    myNode: [
      { name: 'mid_section', yardNeeded: 1 },
      { name: 'stripe_1', yardNeeded: 1 },
      { name: 'stripe_2', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 75,
    readyIn: 7,
    // weight: 0.25,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
      },
      {
        label: 'Width (cm)',
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Text Up, Image Down Sash",
  //   image: image_sash_with_images,
  //   model: sash_with_image,
  //   confirm_image: image_confirm_4,
  //   myNode: [
  //     { name: "plain_section", yardNeeded: 1 },
  //     { name: "stripe_1", yardNeeded: 1 },
  //     { name: "stripe_2", yardNeeded: 1 },
  //     { name: "mid_stripes", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 2,
  //   price: 150,
  //   // sizeModels: tshirt_model,
  //   readyIn: 7,
  //   // weight: 0.25,
  //   sizeGuide: sash_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Length (cm)",
  //     },
  //     {
  //       label: "Width (cm)",
  //     },
  //   ],
  // },
  {
    id: uuid(),
    name: 'One-Sided Logo, Two-Sided Text Sash',
    title: 'Sash Variant 4',
    description:
      'This sash allows logos/designs on one side and text on both sides',
    image: image_sash_striped_edge,
    model: sash_striped_edge,
    confirm_image: image_confirm_5,
    myNode: [
      { name: 'mid_section', yardNeeded: 1 },
      { name: 'stripe_1', yardNeeded: 1 },
      { name: 'stripe_2', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 2,
    price: 75,
    readyIn: 7,
    sizeGuide: sash_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Length (cm)',
      },
      {
        label: 'Width (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Beads Bracelet',
    image:
      'https://shoptarahco.com/cdn/shop/products/tiger-eye-bead-bracelet-998994_800x.jpg?v=1652819990',
    model: bangles_model_no_name_board,
    myNode: [{ name: 'all', yardNeeded: 1 }],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 45,
    readyIn: 7,
    sizeGuide: bangle_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Wrist size (cm)',
      },
    ],
  },
  {
    id: uuid(),
    name: 'Brass Name Beads Bracelet Variant One',
    image: bangles,
    model: bangles_model,
    myNode: [
      { name: 'large_beads', yardNeeded: 1 },
      { name: 'small_beads', yardNeeded: 1 },
      { name: 'brass', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 45,
    readyIn: 7,
    sizeGuide: bangle_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Wrist size (cm)',
      },
    ],
  },

  {
    id: uuid(),
    name: 'Brass Name Beads Bracelet Variant Two',
    image: bangles_two,
    model: bangles_variant_three,
    myNode: [
      { name: 'large_beads', yardNeeded: 1 },
      { name: 'small_beads', yardNeeded: 1 },
      { name: 'brass', yardNeeded: 1 },
    ],
    otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
    myZoom: 0.8,
    price: 45,
    readyIn: 7,
    sizeGuide: bangle_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Wrist size (cm)',
      },
    ],
  },

  {
    id: uuid(),
    name: 'Waist Bag',
    image: image_waist_bag,
    model: mini_bag_model,
    isAccessory: true,
    myNode: [
      { name: 'main_body', yardNeeded: 1 },
      // { name: "handle", yardNeeded: 1 },
      { name: 'zippers', yardNeeded: 1 },
    ],
    myZoom: 0.6,
    price: 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: miniBag_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
      { label: 'XL', value: 3 },
      { label: '2XL', value: 4 },
    ],
    sizeForms: [
      {
        label: 'Min-Max circumference (cm)',
      },
      {
        label: 'Width (cm)',
      },
      // Add more form fields as needed
    ],
  },
  {
    id: uuid(),
    name: 'Backpack',
    image: image_backpack,
    model: backpack_model,
    isAccessory: true,
    myNode: [
      { name: 'body', yardNeeded: 1 },
      // { name: "handles", yardNeeded: 1 },
      { name: 'zippers', yardNeeded: 1 },
    ],
    myZoom: 0.75,
    price: 150 + 200,
    // sizeModels: tshirt_model,
    readyIn: 7,
    sizeGuide: backpack_guide,
    sizeOptions: [
      { label: 'S', value: 0.5 },
      { label: 'M', value: 1 },
      { label: 'L', value: 2 },
    ],
    sizeForms: [
      {
        label: 'Height (cm)',
      },
      {
        label: 'Depth (cm)',
      },
      {
        label: 'Width (cm)',
      },
    ],
  },
  // {
  //   id: uuid(),
  //   name: "Earring",
  //   image: earring,
  //   model: earring_model,
  //   myNode: [
  //     { name: "balls", yardNeeded: 1 },
  //     { name: "brass", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
  //   myZoom: 0.8,
  //   price: 5,
  //   readyIn: 7,
  //   sizeGuide: earring_guide,
  //   sizeOptions: [
  //     { label: "S", value: 0.5 },
  //     { label: "M", value: 1 },
  //     { label: "L", value: 2 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Earlobe (mm)",
  //     },
  //   ],
  // },
  // {
  //   id: uuid(),
  //   name: "Bikini",
  //   image: image_bikini,
  //   model: bikini,
  //   myNode: [
  //     { name: "bikini_all", yardNeeded: 3 },
  //     { name: "bikini_top", yardNeeded: 1 },
  //   ],
  //   otherYards: { small: 1, large: 3, extraLarge: 3, extraExtraLarge: 4 },
  //   myZoom: 0.8,
  //   price: 100,
  //   // sizeModels: tshirt_model,
  //   readyIn: 7,
  //   sizeGuide: bikini_guide,
  //   sizeOptions: [
  //     // { label: "XS", value: 0.5 },
  //     { label: "S", value: 0.5, priceValue: 0, colorPriceValue: 60 },
  //     { label: "M", value: 1, priceValue: 0, colorPriceValue: 60 },
  //     { label: "L", value: 2, priceValue: 0, colorPriceValue: 60 },
  //     { label: "XL", value: 3, priceValue: 0, colorPriceValue: 60 },
  //     { label: "2XL", value: 4, priceValue: 0, colorPriceValue: 60 },
  //   ],
  //   sizeForms: [
  //     {
  //       label: "Upper Bust (cm)",
  //     },
  //     {
  //       label: "Under Bust (cm)",
  //     },
  //     {
  //       label: "Waist (cm)",
  //     },
  //     {
  //       label: "Bottom Length (cm)",
  //     },
  //     // Add more form fields as needed
  //   ],
  // },
];
