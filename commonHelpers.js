import{S as k,i as a,a as m}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const S=document.querySelector(".js-search-form"),g=document.querySelector(".loader"),c=document.querySelector(".js-gallery"),s=document.querySelector(".js-loadmore"),p=document.querySelector(".js-backdrop");let n=1,u="";const h=new k(".gallery a",{captionDelay:250,captionsData:"alt"});S.addEventListener("submit",q);s.addEventListener("click",w);async function q(r){if(r.preventDefault(),c.innerHTML="",s.classList.add("is-hidden"),n=1,u=r.target.elements.search.value.trim(),L(),!u)return f(),c.innerHTML="",s.classList.add("is-hidden"),a.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"blue",timeout:"5000",message:"Please fill out search field",position:"topRight"});try{const{data:{hits:t,totalHits:i}}=await y(u,n);t.length>0?(c.innerHTML=b(t),h.refresh(),s.classList.remove("is-hidden"),n*40>=i&&(s.classList.add("is-hidden"),a.info({messageColor:"rgb(66, 170, 255)",backgroundColor:"blue",timeout:"3000",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))):(s.classList.add("is-hidden"),a.error({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"5000",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}))}catch{a.error({title:Error,messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",position:"topRight"})}finally{f()}r.target.reset()}async function w(){n+=1,L();try{const{data:{hits:r,totalHits:t}}=await y(u,n);c.insertAdjacentHTML("beforeend",b(r)),h.refresh(),s.classList.remove("is-hidden"),n*40>=t&&(s.classList.add("is-hidden"),a.info({messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"6000",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({title:Error,messageColor:"rgb(255, 255, 255)",backgroundColor:"red",timeout:"3000",position:"topRight"})}finally{f()}}function y(r,t){const i="41659492-ec5a278d39a7ff9431707ab98";return m.defaults.baseURL="https://pixabay.com/api/",m.get("",{params:{key:i,q:r,page:t,per_page:40,image_type:"photo",orientation:"horizontal",safesearch:!0}})}function b(r){return r.map(t=>{const{webformatURL:i,largeImageURL:d,tags:e,likes:o,views:l,comments:v,downloads:C}=t;return`
        <li class="gallery-item">
          <a href="${d}">
            <img src="${i}" alt="${e}"  >
          </a>
          <div class="gallery-item-info">
            <div class="info">
            <p><b>Likes</b></p>
            <p>${o}</p>
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
      `}).join("")}function L(){g.classList.remove("hidden"),p.classList.remove("is-hidden")}function f(){g.classList.add("hidden"),p.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
