import '@testing-library/jest-dom'

/// <reference types = "vitest" />

import { afterEach,  } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach (() => {
    cleanup ()
})
