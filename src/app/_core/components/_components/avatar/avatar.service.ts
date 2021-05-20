import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// PACKAGE
import { css } from '@emotion/css';
import { Color } from 'rendikit-theme';

@Injectable()
export class AvatarService {
  constructor() {}

  getDynamicStyle(inputs: any): any {
    const main = css`
      position: static;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: ${Color.Normal('white')};
      align-items: stretch;
      box-sizing: content-box;
      cursor: inherit;
      outline: none;
      overflow: hidden;
      transform: translateZ(0px);
      transition: transform 200ms ease 0s, opacity 200ms ease 0s;
      box-shadow: ${Color.Normal('N200')} 0px 0px 0px 1px;
      border: none;
      padding: 0px;
      width: ${inputs.size}px;
      height: ${inputs.size}px;

      ${inputs.appearance === 'circle' &&
      css`
        border-radius: 50%;
      `}

      ${inputs.appearance === 'square' &&
      css`
        border-radius: 8px;
      `}

      ${inputs.src === '' &&
      css`
        span {
          background-color: ${Color.Normal('N200')};
          width: 100%;
          height: 100%;
          display: block;

          span {
            display: inline-block;
            flex-shrink: 0;
            line-height: 1;

            svg {
              max-height: 100%;
              max-width: 100%;
              vertical-align: bottom;
              overflow: hidden;
              pointer-events: none;
              color: ${Color.Normal('white')};
              fill: ${Color.Normal('N200')};
              width: ${inputs.size}px;
              height: ${inputs.size}px;
            }
          }
        }
      `}

      ${inputs.src !== '' &&
      css`
        span {
          background-image: url('${inputs.src}');
          background-color: transparent;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          flex: 1 1 100%;
          height: 100%;
          width: 100%;
        }
      `}
    `;

    return {
      main,
    };
  }
}
