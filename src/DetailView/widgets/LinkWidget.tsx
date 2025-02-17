import React from 'react'
import { Link } from '@chakra-ui/core'
import styled from 'styled-components'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { getWidgetContent } from '../utils/dataAccess'
import { EventNameEnum, WidgetTypeEnum, pushAnalytics } from '../../integration/analytics'

import type { GenericAccessor, WidgetProps } from '../../typing'

const StyledLinkWidget = styled.div`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
`

type LinkWidgetProps = WidgetProps & { href: GenericAccessor; target?: string }

const LinkWidget = (props: LinkWidgetProps): JSX.Element => {
  const { name, mainDetailObject, href, helpText, description, style, containerStore, target = '_blank' } = props

  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })
  const linkHref = getWidgetContent(name, mainDetailObject, href, context)

  const handleClick = (): void => {
    pushAnalytics({
      eventName: EventNameEnum.LINK_CLICK,
      widgetType: WidgetTypeEnum.ACTION,
      value: linkHref,
      objectForAnalytics: props.mainDetailObject,
      ...props,
    })
  }

  return (
    <WidgetWrapper name={name} style={style} helpText={helpText || ''} description={description}>
      <StyledLinkWidget>
        {linkHref ? (
          <Link target={target} href={linkHref} onClick={() => handleClick()} color="teal.500">
            {content || 'Ссылка'}
          </Link>
        ) : (
          '\u00a0'
        )}
      </StyledLinkWidget>
    </WidgetWrapper>
  )
}

export { LinkWidget }
