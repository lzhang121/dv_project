from flask import Flask, request, render_template, jsonify
import fugashi
from pykakasi import kakasi

app = Flask(__name__)

# 初始化分词器和pykakasi转换器
tagger = fugashi.Tagger()

kakasi_inst = kakasi()
kakasi_inst.setMode("H", "a")  # 汉字转平假名
kakasi_inst.setMode("K", "a")
kakasi_inst.setMode("J", "a")
kakasi_inst.setMode("r", "Hepburn")  # 可选: 设置但不使用罗马音
conv = kakasi_inst.getConverter()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    text = data.get("text", "")
    output = []

    for word in tagger(text):
        surface = word.surface
        result = conv.convert(surface)

        if result and result[0]['hira'] != surface:
            ruby = f"<ruby>{surface}<rt>{result[0]['hira']}</rt></ruby>"
        else:
            ruby = surface

        output.append(ruby)

    html_result = "".join(output)
    return jsonify({"html": html_result})


if __name__ == '__main__':
    app.run(debug=True)
