namespace WordLists {
    //% fixedInstance
    //% block="z Empty Filter"
    export let zEmptyFilter: Bloom = new Bloom(null)
    
    //% block
    export function isWordInFilter(filter: Bloom, word: string): boolean {
        return filter.findWord(word)
    }
}
