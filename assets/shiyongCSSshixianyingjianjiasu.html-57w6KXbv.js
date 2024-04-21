import{_ as e,r as t,o,c,a as n,d as s,e as i,b as p}from"./app-Zy-6XiuU.js";const l={},r=p(`<blockquote><p>硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能，</p></blockquote><p>一般触发硬件加速的<code>CSS</code>属性有<code>transform</code>、<code>opacity</code>、<code>filter</code>，为了避免2D动画在开始和结束的时候的<code>repaint</code>操作，一般使用<code>tranform:translateZ(0)</code></p><p><strong>使用CSS实现硬件加速可以通过以下方法：</strong></p><ol><li><strong>使用3D变换</strong>：通过应用3D变换，如<code>translateZ(0)</code>，来触发硬件加速。这会将元素视为3D空间中的一个对象，使浏览器使用GPU进行渲染。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 
        @<span class="token property">程序员poetry</span><span class="token punctuation">:</span> 代码已经复制到剪贴板
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><strong>使用CSS动画</strong>：使用CSS动画属性（如<code>transform</code>、<code>opacity</code>、<code>filter</code>）来触发硬件加速。这可以通过创建一个动画并将其应用于元素来实现。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> myAnimation 1s linear infinite<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> myAnimation</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

 
        @<span class="token property">程序员poetry</span><span class="token punctuation">:</span> 代码已经复制到剪贴板
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><strong>使用CSS过渡</strong>：通过使用CSS过渡属性（如<code>transform</code>、<code>opacity</code>、<code>filter</code>）来触发硬件加速。这可以通过设置过渡效果来实现。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.element</span> <span class="token punctuation">{</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> transform 0.3s ease<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.element:hover</span> <span class="token punctuation">{</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 
        @<span class="token property">程序员poetry</span><span class="token punctuation">:</span> 代码已经复制到剪贴板
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，硬件加速并不是适用于所有情况的解决方案，它对于涉及大量动画或复杂渲染的元素特别有效。但是，在某些情况下，过多地使用硬件加速可能会导致性能问题，因此需要在实际使用时进行评估和测试。</p>`,10),d={id:"",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#",-1),v={href:"https://interview.poetries.top/docs/base.html#_48-%E9%87%8D%E7%BB%98%E5%92%8C%E5%9B%9E%E6%B5%81-%E9%87%8D%E6%8E%92-%E6%98%AF%E4%BB%80%E4%B9%88-%E5%A6%82%E4%BD%95%E9%81%BF%E5%85%8D",target:"_blank",rel:"noopener noreferrer"};function m(k,b){const a=t("ExternalLinkIcon");return o(),c("div",null,[r,n("h3",d,[u,s(),n("a",v,[s("#"),i(a)])])])}const g=e(l,[["render",m],["__file","shiyongCSSshixianyingjianjiasu.html.vue"]]);export{g as default};
