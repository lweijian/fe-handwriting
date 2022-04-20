class Trie {
    constructor() {
        this.node = {}
    }

    insert(word) {
        let node = this.node
        let len = word.length
        for (let i = 0; i < len; i++) {
            let key = word[i]
            if (!node.hasOwnProperty(key)) {
                node[key] = {}
            }
            node = node[key]
        }
        node['isEnd'] = true
    }

    search(word) {
        let node = this.node
        let len = word.length
        for (let i = 0; i < len; i++) {
            let key = word[i]
            if (!node.hasOwnProperty(key)) {
                return false
            }
            node = node[key]
        }
        return node.hasOwnProperty('isEnd');
    }

    startWith(prefix) {
        let node = this.node;
        for (let c of prefix) {
            if (!node[c]) {
                return false
            }
            node = node[c]
        }
        return node
    }

    findSuffix(word) {
        //递归查找
        function findAll(prefix, node, arr = [prefix]) {
            for (let key in node) {
                if (key !== 'isEnd') {
                    let word = prefix + key
                    arr.push(word)
                    findAll(word, node[key], arr)
                }
            }
            return arr;
        }

        let node = this.startWith(word)
        if (!node) {
            return false;
        }
        return findAll(word, node)
    }


}
