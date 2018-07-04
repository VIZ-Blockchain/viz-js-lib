import assert from 'assert'
import viz from '../src'

import { camelCase } from '../src/utils'
import { methods_test } from './methods_by_version'

describe('viz.methods', () => {

    it('has all generated methods', () => {

        const methods = methods_test
            .map( m => `${camelCase(m)}`)
            .sort()

        let libMethods = Object.keys(viz.api.VIZ.prototype)
            .filter( m => !m.endsWith('With'))
            .filter( m => !m.endsWith('Async'))
            .sort()

        assert.equal(libMethods.length, methods.length)
        assert.deepEqual(libMethods, methods)
    })
})