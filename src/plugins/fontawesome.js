
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSearch, faTimes, faEllipsisV, faThumbsUp, faThumbsDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { faSearchengin, faWikipediaW } from '@fortawesome/free-brands-svg-icons'

library.add(faSearchengin, faSearch, faTimes, faEllipsisV, faThumbsUp, faThumbsDown, faWikipediaW, faChevronLeft)

Vue.component('icon', FontAwesomeIcon)
