import{S,i as a,a as g}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const k=document.querySelector(".js-search-form"),f=document.querySelector(".loader"),c=document.querySelector(".js-gallery"),s=document.querySelector(".js-loadmore"),p=document.querySelector(".js-backdrop");let n=1,u="";const h=new S(".gallery a",{captionDelay:250,captionsData:"alt"});k.addEventListener("submit",w);s.addEventListener("click",q);async function w(t){if(t.preventDefault(),c.innerHTML="",s.classList.add("is-hidden"),n=1,u=t.target.elements.search.value.trim(),L(),!u)return m(),c.innerHTML="",s.classList.add("is-hidden"),a.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"5000",message:"Please fill out search field",position:"topRight"});try{const{data:{hits:o,totalHits:i}}=await y(u,n);o.length>0?(c.innerHTML=b(o),h.refresh(),s.classList.remove("is-hidden"),n*40>=i&&(s.classList.add("is-hidden"),a.info({messageColor:"rgb(66, 170, 255)",backgroundColor:"blue",timeout:"3000",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))):(s.classList.add("is-hidden"),a.error({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"5000",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}))}catch{a.error({title:Error,messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",position:"topRight"})}finally{m()}t.target.reset()}async function q(){n+=1,L();try{const{data:{hits:t,totalHits:o}}=await y(u,n);c.insertAdjacentHTML("beforeend",b(t)),h.refresh(),s.classList.remove("is-hidden"),n*40>=o&&(s.classList.add("is-hidden"),a.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"6000",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:Error,messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",position:"topRight"})}finally{m(),R()}}function y(t,o){const i="41659492-ec5a278d39a7ff9431707ab98";return g.defaults.baseURL="https://pixabay.com/api/",g.get("",{params:{key:i,q:t,page:o,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0}})}function b(t){return t.map(o=>{const{webformatURL:i,largeImageURL:d,tags:e,likes:r,views:l,comments:v,downloads:C}=o;return`
        <li class="gallery-item">
          <a href="${d}">
            <img src="${i}" alt="${e}"  >
          </a>
          <div class="gallery-item-info">
            <div class="info">
            <p><b>Likes</b></p>
            <p>${r}</p>
            </div>
            <div class="info">
            <p><b>Views</b></p>
            <p>${l}</p>
            </div>
            <div class="info">
            <p><b>Comments</b></p>
            <p>${v}</p>
            </div>
            <div class="info">
            <p><b>Downloads</b></p>
            <p>${C}</p>
            </div>
          </div>
        </li>
      `}).join("")}function R(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height*5;window.scrollBy({top:t,behavior:"smooth"})}function L(){f.classList.remove("hidden"),p.classList.remove("is-hidden")}function m(){f.classList.add("hidden"),p.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
