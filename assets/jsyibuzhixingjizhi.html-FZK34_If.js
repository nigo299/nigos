import{_ as t,r as i,o,c,a as n,d as e,e as a,b as l}from"./app-Zy-6XiuU.js";const p={},r=l(`<h2 id="js-异步执行机制" tabindex="-1"><a class="header-anchor" href="#js-异步执行机制" aria-hidden="true">#</a> JS 异步执行机制</h2><p>在 js 执行过程中有 <strong>微任务</strong> 和 <strong>宏任务</strong> 之分, 且 JS 在执行下一个宏任务之前会保证微任务队列为空。</p><h2 id="微任务" tabindex="-1"><a class="header-anchor" href="#微任务" aria-hidden="true">#</a> 微任务</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Promise.then\`, \`process.nextTick(node)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="宏任务" tabindex="-1"><a class="header-anchor" href="#宏任务" aria-hidden="true">#</a> 宏任务</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>整体的JS代码\`, \`setTimeout\`, \`setInterval
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> log <span class="token punctuation">}</span> <span class="token operator">=</span> console<span class="token punctuation">;</span>
<span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 首先呢，JS代码是从上至下逐行执行，到这里先打印 1</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// 到了这里，遇到了异步任务，把异步操作加到异步队列中，然后接着往下执行JS代码</span>
  <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行到这里，这里的代码也是同步的，因此打印 3</span>
  <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// resolve 执行以后会进入.then, .then里面也是异步执行， 因此加入异步队列，整个的JS代码第一次就执行完了</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 现在异步队列中有两个任务, setTimeout，Promise.then. JS在执行下一个宏任务之前会保证微任务队列为空，因此会先打印 4, 再打印 2</span>
<span class="token comment">// 正确答案: 1342</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="再看一个比较复杂的-demo" tabindex="-1"><a class="header-anchor" href="#再看一个比较复杂的-demo" aria-hidden="true">#</a> 再看一个比较复杂的 demo</h2><p>js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setTimeout(() =&gt; {
    console.log(&#39;set1 &#39;)
    new Promise((resolve, reject) =&gt; {
        console.log(&#39;pr1 &#39;)
        resolve()
    }).then(() =&gt; {
        console.log(&#39;then1 &#39;);
    })
})

setTimeout(() =&gt; {
    console.log(&#39;set2 &#39;)
})

new Promise((resolve, reject) =&gt; {
    console.log(&#39;pr2 &#39;)
    resolve()
}).then(() =&gt; {
    console.log(&#39;then2 &#39;);
})

new Promise((resolve, reject) =&gt; {
    console.log(&#39;pr3 &#39;)
    resolve()
    setTimeout(() =&gt; {
        console.log(&#39;set3 &#39;);
    })
}).then(() =&gt; {
    console.log(&#39;then3 &#39;);
})
console.log(1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>正确答案：pr2 pr3 1 then2 then3 set1 pr1 then1 set2 set3</p></blockquote><h2 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h2><p><img src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/js-run-async.jpg" alt="img"></p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,15),d={href:"https://study.163.com/course/courseLearn.htm?courseId=1210407064",target:"_blank",rel:"noopener noreferrer"},u={href:"https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules",target:"_blank",rel:"noopener noreferrer"};function v(m,k){const s=i("ExternalLinkIcon");return o(),c("div",null,[r,n("ol",null,[n("li",null,[n("a",d,[e("网易云课堂公开课视频"),a(s)])]),n("li",null,[n("a",u,[e("tasks-microtasks-queues-and-schedules"),a(s)])])])])}const b=t(p,[["render",v],["__file","jsyibuzhixingjizhi.html.vue"]]);export{b as default};
