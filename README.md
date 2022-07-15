<h1 align="center"><a href="https://github.com/leepand/open-mlops">mlopskit</a></h1>
<p align="center">
  <em>用于生产 MLOps 的Python简易框架</em>
</p>

---

<p align="center">
  <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/appveyor/tests/leepand/open-mlops" /></a>
  <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/github/commit-activity/w/leepand/open-mlops" /></a>
  <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/pypi/format/algolink" /></a>
       <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/github/watchers/leepand/open-mlops?style=social" /></a>     
   <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/github/forks/leepand/open-mlops?style=social" /></a>   
   <a href="https://github.com/leepand/open-mlops"><img src="https://img.shields.io/github/stars/leepand/open-mlops?style=social" /></a>   
   
</p>

从0-1的 MLOps 项目，适应于中小型企业的 MLOps 实践参考。

## 快速开始

安装invoke:

```
pip install invoke
```

然后运行:

```
invoke buildAndServe
```

mlopskit使用mlflow进行模型实验的跟踪、模型注册等功能，并提供了一种直接且一致的方式来将预测代码封装在一个Model类中：


## 技术架构

<img src="resources/art.png">

## 相关资源
* [MLOps-机器学习从开发到生产](https://github.com/leepand/MLOps-practice)<br/>
