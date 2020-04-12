import type { Component } from 'react';
import type { BaseField } from './BaseField';
import type { LayoutData } from '../../typing';

type FieldPosition = {
  topLeft: number[]
  lowRight: number[]
}

export abstract class FieldDescription {
  name!: string

  readOnly!: boolean

  fieldType!: typeof BaseField

  widget!: Component

  layout!: LayoutData

  position?: FieldPosition

  className?: string
}
