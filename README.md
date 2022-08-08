# vue-3d-force-graph
3d知识图谱

## 参考

图形存储数据库

[https://github.com/neo4j/neo4j](https://github.com/neo4j/neo4j)

三维空间图形

[https://github.com/vasturiano/3d-force-graph](https://github.com/vasturiano/3d-force-graph)

## 实践

基于@3d-force-graph实现vue版本插件，支持VUE3

[https://github.com/zjfcool/vue-force-graph](https://github.com/zjfcool/vue-force-graph)

知识库：

```html
{
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "group": "供水" 
        },
        { 
          "id": "id2",
          "name": "name2",
          "group": "供水" 
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}
```

- id：唯一标识
- name：知识名称/关键字
- group：知识分类，供水、供热、排水、桥梁、燃气
