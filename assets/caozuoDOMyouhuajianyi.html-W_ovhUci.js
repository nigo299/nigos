import{_ as n,o as s,c as a,b as t}from"./app-Zy-6XiuU.js";const p={},e=t(`<p>由于操作 DOM 会引起浏览器回流、重绘，但操作 DOM 又是我们无法避免的，因此优化操作 DOM 的逻辑就显得尤为重要：</p><ul><li><strong>合并多次 DOM 修改，尽量减少修改次数，比如：</strong></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> times <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;#content&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
times<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>content<span class="token punctuation">.</span>innerHtml <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>index<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 合并更改</span>
<span class="token keyword">let</span> innerhtml <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
times<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>innerhtml <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>index<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
content<span class="token punctuation">.</span>innerHtml <span class="token operator">+=</span> innerhtml<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用案例： Vue 的 DOM 异步更新策略——当我们改变了响应式的变量，会触发 setter，Vue 会对依赖这个变量的视图进行 diff &amp; update，但是并不是我们一改变这些变量就会立马更新视图，因为我们可能会更改多个变量，如果改一下，立马就去更新 DOM，就会很消耗性能。Vue 会将更新任务放进一个队列，并创建一个异步任务用于执行队列中的更新函数。</p><ul><li><strong>使用 DocumentFragment 接口</strong></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fragment <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createDocumentFragment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
times<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>fragment<span class="token punctuation">.</span>innerHtml <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;span&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>index<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
content<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>fragment<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改样式时，尽量将样式写到 class 中，去更改 class， 非必要不要直接修改 style</strong></li><li><strong>修改 DOM 时，先将要修改的 DOM 从 DOM 树分离出来，再进行修改</strong></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> content <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;#content&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// 分离要修改的 DOM</span>
content<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&#39;none&#39;</span>
content<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">&#39;200px&#39;</span>
content<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">&#39;200px&#39;</span>
content<span class="token punctuation">.</span>style<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">&#39;1px solid green&#39;</span>
content<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">&#39;red&#39;</span>
<span class="token operator">...</span>（省略了许多类似的后续操作）
<span class="token comment">// 修改完了在显示出来</span>
container<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">&#39;block&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>以上这些优化手段我们能想到，那开发浏览器的大佬们肯定也能想到，就算我们不按照上面的做，浏览器也会像类似 Vue 那样异步去回流，现在的浏览器越来越聪明了，但是为了保险起见，我们还是把代码尽量往最优的写为好。</strong></p>`,9),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","caozuoDOMyouhuajianyi.html.vue"]]);export{r as default};
