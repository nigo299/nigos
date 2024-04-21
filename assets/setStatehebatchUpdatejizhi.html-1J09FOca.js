import{_ as n,o as s,c as a,b as t}from"./app-Zy-6XiuU.js";const e={},p=t(`<h3 id="setstate-和-batchupdate-机制" tabindex="-1"><a class="header-anchor" href="#setstate-和-batchupdate-机制" aria-hidden="true">#</a> setState 和 batchUpdate 机制</h3><ul><li><code>setState</code>在 react 事件、生命周期中是异步的（在<code>react</code>上下文中是异步）；在<code>setTimeout</code>、自定义<code>DOM</code>事件中是同步的</li><li>有时合并（对象形式<code>setState({})</code> =&gt; 通过<code>Object.assign</code>形式合并对象），有时不合并（函数形式<code>setState((prevState,nextState)=&gt;{})</code>）</li></ul><p><strong>核心要点</strong></p><p>1.<code>setState</code>主流程</p><ul><li><p><code>setState</code>是否是异步还是同步，看是否能命中<code>batchUpdate</code>机制，判断<code>isBatchingUpdates</code></p></li><li><p>哪些能命中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>batchUpdate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>机制</p><ul><li>生命周期</li><li><code>react</code>中注册的事件和它调用的函数</li><li>总之在<code>react</code>的上下文中</li></ul></li><li><p>哪些不能命中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>batchUpdate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>机制</p><ul><li><code>setTimeout</code>、<code>setInterval</code>等</li><li>自定义<code>DOM</code>事件</li><li>总之不在<code>react</code>的上下文中，<code>react</code>管不到的</li></ul></li></ul><p><img src="https://nigo299.github.io/nigos/react4.png" alt="img"></p><ol><li><code>batchUpdate</code>机制</li></ol><p><img src="https://nigo299.github.io/nigos/react5.png" alt="img"> <img src="https://nigo299.github.io/nigos/react6.png" alt="img"></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// setState batchUpdate原理模拟</span>
<span class="token keyword">let</span> isBatchingUpdate <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token parameter">newSate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//state={...state,...newSate}</span>
  <span class="token comment">// setState异步更新</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isBatchingUpdate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newSate<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// setState同步更新</span>
    state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> <span class="token operator">...</span>newSate <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// react事件是合成事件，在合成事件中isBatchingUpdate需要设置为true</span>
<span class="token comment">// 模拟react中事件点击</span>
<span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  isBatchingUpdate <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 批量更新标志</span>

  <span class="token doc-comment comment">/**我们自己逻辑开始 */</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> state<span class="token punctuation">.</span>number <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> state<span class="token punctuation">.</span>number <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> state<span class="token punctuation">.</span>number <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
  <span class="token doc-comment comment">/**我们自己逻辑结束 */</span>

  state <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">newState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>newState<span class="token punctuation">,</span> <span class="token operator">...</span>action <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>

  isBatchingUpdate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 执行结束设置false</span>
<span class="token punctuation">}</span>
<span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>transaction</code>事务机制</li></ol><p><img src="https://nigo299.github.io/nigos/react7.png" alt="img"> <img src="https://nigo299.github.io/nigos/react8.png" alt="img"> <img src="https://nigo299.github.io/nigos/react9.png" alt="img"></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// setState现象演示</span>

<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 函数组件（后面会讲），默认没有 state</span>
<span class="token keyword">class</span> <span class="token class-name">StateDemo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 第一，state 要在构造函数中定义</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>increase<span class="token punctuation">}</span><span class="token operator">&gt;</span>累加<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function-variable function">increase</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// // 第二，不要直接修改 state ，使用不可变值 ----------------------------</span>
    <span class="token comment">// // this.state.count++ // 错误</span>
    <span class="token comment">// this.setState({</span>
    <span class="token comment">//     count: this.state.count + 1 // SCU</span>
    <span class="token comment">// })</span>
    <span class="token comment">// 操作数组、对象的的常用形式</span>

    <span class="token comment">// 第三，setState 可能是异步更新（有可能是同步更新） ----------------------------</span>

    <span class="token comment">// this.setState({</span>
    <span class="token comment">//     count: this.state.count + 1</span>
    <span class="token comment">// }, () =&gt; {</span>
    <span class="token comment">//     // 联想 Vue $nextTick - DOM</span>
    <span class="token comment">//     console.log(&#39;count by callback&#39;, this.state.count) // 回调函数中可以拿到最新的 state</span>
    <span class="token comment">// })</span>
    <span class="token comment">// console.log(&#39;count&#39;, this.state.count) // 异步的，拿不到最新值</span>

    <span class="token comment">// // setTimeout 中 setState 是同步的</span>
    <span class="token comment">// setTimeout(() =&gt; {</span>
    <span class="token comment">//     this.setState({</span>
    <span class="token comment">//         count: this.state.count + 1</span>
    <span class="token comment">//     })</span>
    <span class="token comment">//     console.log(&#39;count in setTimeout&#39;, this.state.count)</span>
    <span class="token comment">// }, 0)</span>

    <span class="token comment">// 自己定义的 DOM 事件，setState 是同步的。再 componentDidMount 中</span>

    <span class="token comment">// 第四，state 异步更新的话，更新前会被合并 ----------------------------</span>

    <span class="token comment">// 传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1</span>
    <span class="token comment">// this.setState({</span>
    <span class="token comment">//     count: this.state.count + 1</span>
    <span class="token comment">// })</span>
    <span class="token comment">// this.setState({</span>
    <span class="token comment">//     count: this.state.count + 1</span>
    <span class="token comment">// })</span>
    <span class="token comment">// this.setState({</span>
    <span class="token comment">//     count: this.state.count + 1</span>
    <span class="token comment">// })</span>

    <span class="token comment">// 传入函数，不会被合并。执行结果是 +3</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// bodyClickHandler = () =&gt; {</span>
  <span class="token comment">//     this.setState({</span>
  <span class="token comment">//         count: this.state.count + 1</span>
  <span class="token comment">//     })</span>
  <span class="token comment">//     console.log(&#39;count in body event&#39;, this.state.count)</span>
  <span class="token comment">// }</span>
  <span class="token comment">// componentDidMount() {</span>
  <span class="token comment">//     // 自己定义的 DOM 事件，setState 是同步的</span>
  <span class="token comment">//     document.body.addEventListener(&#39;click&#39;, this.bodyClickHandler)</span>
  <span class="token comment">// }</span>
  <span class="token comment">// componentWillUnmount() {</span>
  <span class="token comment">//     // 及时销毁自定义 DOM 事件</span>
  <span class="token comment">//     document.body.removeEventListener(&#39;click&#39;, this.bodyClickHandler)</span>
  <span class="token comment">//     // clearTimeout</span>
  <span class="token comment">// }</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> StateDemo<span class="token punctuation">;</span>

<span class="token comment">// -------------------------- 我是分割线 -----------------------------</span>

<span class="token comment">// 不可变值（函数式编程，纯函数） - 数组</span>
<span class="token comment">// const list5Copy = this.state.list5.slice()</span>
<span class="token comment">// list5Copy.splice(2, 0, &#39;a&#39;) // 中间插入/删除</span>
<span class="token comment">// this.setState({</span>
<span class="token comment">//     list1: this.state.list1.concat(100), // 追加</span>
<span class="token comment">//     list2: [...this.state.list2, 100], // 追加</span>
<span class="token comment">//     list3: this.state.list3.slice(0, 3), // 截取</span>
<span class="token comment">//     list4: this.state.list4.filter(item =&gt; item &gt; 100), // 筛选</span>
<span class="token comment">//     list5: list5Copy // 其他操作</span>
<span class="token comment">// })</span>
<span class="token comment">// // 注意，不能直接对 this.state.list 进行 push pop splice 等，这样违反不可变值</span>

<span class="token comment">// 不可变值 - 对象</span>
<span class="token comment">// this.setState({</span>
<span class="token comment">//     obj1: Object.assign({}, this.state.obj1, {a: 100}),</span>
<span class="token comment">//     obj2: {...this.state.obj2, a: 100}</span>
<span class="token comment">// })</span>
<span class="token comment">// // 注意，不能直接对 this.state.obj 进行属性设置，这样违反不可变值</span>

<span class="token comment">// setState笔试题考察 下面这道题输出什么</span>
<span class="token keyword">class</span> <span class="token class-name">Example</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// componentDidMount中isBatchingUpdate=true setState批量更新</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// setState传入对象会合并，后面覆盖前面的Object.assign({})</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加到queue队列中，等待处理</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 第 1 次 log</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加到queue队列中，等待处理</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 第 2 次 log</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 到这里this.state.val结果等于1了</span>
      <span class="token comment">// 在原生事件和setTimeout中（isBatchingUpdate=false），setState同步更新，可以马上获取更新后的值</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 同步更新</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 第 3 次 log</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 同步更新</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 第 4 次 log</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 答案：0, 0, 2, 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","setStatehebatchUpdatejizhi.html.vue"]]);export{r as default};
