/** 
 * 将私有style转成需要的结构
 * author: daceyu<daceyu@aliyun.com>
 */

import { removeSpaceAndLinebreak } from './utils'

export default class Scaner {
    constructor () {
        this.index = 0;
        this.status = 'off';
    }

    /**
     * css scan
     * param {Object} config:
     * param {Functon} handleStyle: 接收处理完结构的style
     * param {Function} callback: callback function 
     */
    doCssScan (config) {
        let THIS = this;
        let result = {  // 将私有的style每一个都解析成这种结构
            selector: '',
            content: ''
        };

        let cssdata = removeSpaceAndLinebreak(config.data),
            _length = cssdata.length;

        THIS.status = 'selector';
        for (THIS.index = 0; THIS.index < _length; THIS.index++) {
            let _data = cssdata[THIS.index],
                _status = THIS.status;

            // 匹配到`{`即样式内容开始位置；`}`即当前样式结束位置。
            if (_data === '{' && 
                !~cssdata.slice(THIS.index - 1, THIS.index + 2).indexOf('{{') || 
                _data === '}' && 
                (THIS.index === _length - 1 || !~cssdata.slice(THIS.index - 1, THIS.index + 2).indexOf('}}'))
                ) {
                // 默认`THIS.status`跟`_status`都等于`selector`
                // 匹配到样式开始，`THIS.status`等于`content`，`_status`不变
                // 再次进入循环，`THIS.status`跟`_status`都等于`content`
                // 直到匹配到当前样式结束`THIS.status`重新恢复等于`selector`，`_status`不变
                THIS.status = _status === 'selector' ? 'content' : 'selector';
            } else if (!(!result[THIS.status] && _data == ' ')) {
                result[THIS.status] += cssdata[THIS.index];
            }

            // 达到这个判断条件，一个样式处理结束，处理为`result = { selector: '', content: ''}`结构
            if (THIS.status === 'selector' && _status === 'content') {
                if (config.handleStyle) config.handleStyle(result);

                result.selector = '';
                result.content = '';
            }
        }

        THIS.end(config.callback);
    }

    /**
     * end of scan
     * param {Function} callback: callback function
     */
    end (callback) {
        this.index = 0;
        this.status = 'off';

        if (callback) callback();
    }
}