import{_ as n,o as s,c as a,b as t}from"./app-Zy-6XiuU.js";const p={},e=t(`<h3 id="jsx-本质" tabindex="-1"><a class="header-anchor" href="#jsx-本质" aria-hidden="true">#</a> JSX 本质</h3><ul><li><code>React.createElement</code> 即<code>h</code>函数，返回<code>vnode</code></li><li>第一个参数，可能是组件，也可能是<code>html tag</code></li><li>组件名，首字母必须是大写（<code>React</code>规定）</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// React.createElement写法</span>
React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;tag&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>child1<span class="token punctuation">,</span>child2<span class="token punctuation">]</span><span class="token punctuation">)</span>
React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;tag&#39;</span><span class="token punctuation">,</span> props<span class="token punctuation">,</span> child1<span class="token punctuation">,</span>child2<span class="token punctuation">,</span>child3<span class="token punctuation">)</span>
React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Comp<span class="token punctuation">,</span> props<span class="token punctuation">,</span> child1<span class="token punctuation">,</span>child2<span class="token punctuation">,</span><span class="token string">&#39;文本节点&#39;</span><span class="token punctuation">)</span>



<span class="token comment">// jsx基本用法</span>
<span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;container&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>tet<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>imgSrc<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 编译后 https://babeljs.io/repl</span>
React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">&quot;container&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;p&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;tet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;img&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">src</span><span class="token operator">:</span> imgSrc
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token comment">// jsx style</span>
<span class="token keyword">const</span> styleData <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">fontSize</span><span class="token operator">:</span><span class="token string">&#39;20px&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">color</span><span class="token operator">:</span><span class="token string">&#39;#f00&#39;</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> styleElem <span class="token operator">=</span> <span class="token operator">&lt;</span>p style<span class="token operator">=</span><span class="token punctuation">{</span>styleData<span class="token punctuation">}</span><span class="token operator">&gt;</span>设置style<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">const</span> styleData <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token string">&quot;20px&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&quot;#f00&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> styleElem <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&quot;p&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">style</span><span class="token operator">:</span> styleData
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&quot;\\u8BBE\\u7F6Estyle&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token comment">// jsx加载组件</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Input submitTitle<span class="token operator">=</span><span class="token punctuation">{</span>onSubmitTitle<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>List list<span class="token operator">=</span><span class="token punctuation">{</span>list<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&quot;div&quot;</span><span class="token punctuation">,</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>Input<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">submitTitle</span><span class="token operator">:</span> onSubmitTitle
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>List<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">list</span><span class="token operator">:</span> list
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token comment">// jsx事件</span>
<span class="token keyword">const</span> eventList <span class="token operator">=</span> <span class="token operator">&lt;</span>p onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>clickHandler<span class="token punctuation">}</span><span class="token operator">&gt;</span>text<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">const</span> eventList <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&quot;p&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span>clickHandler
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">&quot;text&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>



<span class="token comment">// jsx列表</span>
<span class="token keyword">const</span> listElem <span class="token operator">=</span> <span class="token operator">&lt;</span>ul<span class="token operator">&gt;</span>
<span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span>index</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>li key<span class="token operator">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token operator">&gt;</span>index<span class="token operator">:</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">&gt;</span>

<span class="token comment">// 编译后</span>

<span class="token keyword">const</span> listElem <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
  <span class="token string">&quot;ul&quot;</span><span class="token punctuation">,</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>
      <span class="token string">&quot;li&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">key</span><span class="token operator">:</span> index
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">&quot;index:&quot;</span><span class="token punctuation">,</span>
      index<span class="token punctuation">,</span>
      <span class="token string">&quot;,title:&quot;</span><span class="token punctuation">,</span>
      item<span class="token punctuation">.</span>title
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","JSXbenzhi.html.vue"]]);export{r as default};
