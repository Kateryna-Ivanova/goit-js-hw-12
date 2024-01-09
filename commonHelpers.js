import{S as c,i as u}from"./assets/vendor-9310f15c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const d=document.querySelector(".form"),i=document.querySelector(".gallery"),l=document.querySelector(".loader"),f=new c(".gallery a",{captionsData:"alt",overlayOpacity:.5});function m(){u.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight",close:!1,closeOnClick:!0})}d.addEventListener("submit",p);function p(r){r.preventDefault(),l.style.display="block",i.innerHTML="";const o=r.target.elements.search.value,n=new URLSearchParams({key:"41488002-513c6a9a4c115eae6a99045d3",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${n}`).then(s=>{if(l.style.display="none",!s.ok)throw new Error(s.status);return s.json()}).then(s=>{if(s.hits.length===0)return i.innerHTML="",m();const e=s.hits.reduce((t,a)=>t+g(a),"");i.innerHTML=e,f.refresh()}).catch(s=>{showAlert(s.toString())})}function g(r){return`<li>
    <a href="${r.largeImageURL}">
        <img src="${r.webformatURL}" alt="${r.tags}">
    </a>
    <div class="info">
        <div class="image-info">
            <span>Likes</span>
            <span class="image-value">${r.likes}</span>
        </div>
        <div class="image-info">
            <span>Views</span>
            <span class="image-value">${r.views}</span>
        </div>
        <div class="image-info">
            <span>Comments</span>
            <span class="image-value">${r.comments}</span>
        </div>
        <div class="image-info">
            <span>Downloads</span>
            <span class="image-value">${r.downloads}</span>
        </div>
    </div>
    </li>`}
//# sourceMappingURL=commonHelpers.js.map
