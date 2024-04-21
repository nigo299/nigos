import{_ as s,o as n,c as e,b as a}from"./app-Zy-6XiuU.js";const i={},l=a(`<p><strong>CSS 选择符是从右到左进行匹配的，当使用后代选择器的时候，浏览器会遍历所有子元素来确定 是否是指定的元素</strong>。</p><p>在合并 <code>DOM</code> 和 <code>CSSDOM</code> 时，会在 <code>CSSDOM</code> 中根据我们写的样式表选择器进行查询，然后把对应的样式应用到 <code>DOM</code>，此时就有一些 <code>CSS</code> 的优化点，如果编写 样式表 能够让浏览器查询的更快？</p><ol><li>避免使用通配符，只对需要用到的元素进行选择。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// ❌
// 会产生大量的计算
*</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>关注可以通过继承实现的属性，避免重复匹配重复定义。</li><li>少用标签选择器。如用类选择器替代。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// ❌
#box span</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token selector">// ✅
.box-spanclass</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>id 和 class 选择器不要写多余的标签选择器。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// ❌
div#box</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token selector">div.test</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token selector">// ✅
#box</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token selector">.test</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>减少选择器的嵌套层级。后代选择器的开销是最高的，因此我们应该尽量将选择器的深度降到最低（最高不要超过三层），尽可能使用类来关联每一个标签元素。</li><li>减少或避免使用<code>@import</code>，使用<code>link</code>。因为<code>@import</code>是在页面加载完成之后才去加载，而<code>link</code>是在页面加载时一起加载。</li><li>属性值为<code>0</code>, 不要加单位。</li><li>不要留着 {} 空规则 不删。</li><li>属性值为<code>0.xxx</code>, 可以不写<code>0</code>，直接<code>.xxx</code>。</li><li>内容与样式分离。</li><li>不滥用<code>web</code>字体。</li><li>慎用 <code>float、position</code>。</li></ol>`,9),c=[l];function o(d,t){return n(),e("div",null,c)}const u=s(i,[["render",o],["__file","CSSyouhuajianyi.html.vue"]]);export{u as default};
