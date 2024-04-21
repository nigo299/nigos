import{_ as n,o as s,c as a,b as t}from"./app-Zy-6XiuU.js";const p={},e=t(`<h2 id="客户端渲染" tabindex="-1"><a class="header-anchor" href="#客户端渲染" aria-hidden="true">#</a> 客户端渲染</h2><p><strong>请求回来的资源 html 中只有根节点，和一堆的 JS，页面的内容要等 客户端执行完 JS 才知道页面有些什么东西。</strong></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>我是客户端渲染的页面<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>root<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务端渲染" tabindex="-1"><a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a> 服务端渲染</h2><p>**完整的 HTML 内容在服务端生成返回给客户端，客户端只需要渲染即可。**来自 Vue ssr 官网的例子：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;vue&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建一个express应用</span>
<span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;express&quot;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 提取出renderer实例</span>
<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;vue-server-renderer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

server<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 编写Vue实例（虚拟DOM节点）</span>
  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> req<span class="token punctuation">.</span>url<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 编写模板HTML的内容</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;访问的 URL 是： {{ url }}&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// renderToString 是把Vue实例转化为真实DOM的关键方法</span>
  renderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> html</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">&quot;Internal Server Error&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 把渲染出来的真实DOM字符串插入HTML模板中</span>
    res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      &lt;!DOCTYPE html&gt;
      &lt;html lang=&quot;en&quot;&gt;
        &lt;head&gt;&lt;title&gt;Hello&lt;/title&gt;&lt;/head&gt;
        &lt;body&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>html<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/body&gt;
      &lt;/html&gt;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上就是把 <strong>本来应该在浏览器跑的 JS，放到 Node 跑一下。</strong></p><h2 id="服务端渲染的优势" tabindex="-1"><a class="header-anchor" href="#服务端渲染的优势" aria-hidden="true">#</a> 服务端渲染的优势</h2><ol><li>有利于 SEO（因为服务端直接返回的完整的 HTML）</li><li>提升首屏加载速度（想一下在客户端渲染模式下：浏览器先请求到 HTML，然后请求 HTML 中的 css、js 资源，然后再构建 DOM、CSSDOM、执行 JS，渲染页面；而服务端渲染时，直接构建 DOM、CSSDOM、渲染页面即可，由此可见服务端渲染会提升首屏性能。）</li></ol><h2 id="服务端渲染的一些思考" tabindex="-1"><a class="header-anchor" href="#服务端渲染的一些思考" aria-hidden="true">#</a> 服务端渲染的一些思考</h2><p>在这个网民遍地的时代，几乎有多少个用户就有多少台浏览器。用户拥有的浏览器总量多到数不清，那么一个公司的服务器又有多少台呢？我们把这么多台浏览器的渲染压力集中起来，分散给相比之下数量并不多的服务器，服务器肯定是承受不住的。所以服务端渲染并不是万全之策，不到万不得已，还是先尝试别的优化方案再来考虑<strong>服务端渲染。</strong></p>`,11),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","tishengshoupingxingnen.html.vue"]]);export{r as default};