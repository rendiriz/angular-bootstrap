import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// PACKAGE
import { css } from '@emotion/css';

@Injectable()
export class AvatarItemService {
  constructor() {}

  getDynamicStyle(inputs: any): any {
    const main = css`
      display: flex;
    `;

    const item = css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 8px;
      margin-right: 8px;
    `;

    const primary = css`
      white-space: ${!inputs.isTruncation ? 'nowrap' : 'none'};

      ${inputs.isTruncation &&
      css`
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      `}
    `;

    const secondary = css`
      white-space: ${!inputs.isTruncation ? 'nowrap' : 'none'};
      color: var(--bs-gray-600);
      font-size: 12px;

      ${inputs.isTruncation &&
      css`
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      `}
    `;

    return {
      main,
      item,
      primary,
      secondary,
    };
  }
}
