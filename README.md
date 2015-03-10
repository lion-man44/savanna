# savanna

jQuery killer

## Usage

```javascript
<script src="bower_components/savanna/savanna.js"></script>

savanna('p')
> Savannaオブジェクト

savanna('p').el
> <p name="abc">テスト</p>
```

```javascript
savanna.ajax('GET', host, callback, params, header);

savanna.addEvent(target, eventname, function, capture);
```
