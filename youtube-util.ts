/**
 * オーナーのコメント一覧を取得する
 * @param ownerName ライブ配信者のチャンネル名
 * @returns 取得できなかった場合はnullを返却する
 */
export function getOwnerCommentOrNull(ownerName: string): Element[] | null {
    const comments = getAllCommentsOrNull();
    if (comments == null) {
        return null;
    }

    return Array.prototype.filter.call(comments, function (comment: Element) {
        isOwnerComment(comment, ownerName);
    });
}

/**
 *  オーナーのコメントか
 */
export function isOwnerComment(comment:Element, ownerName: string): boolean {
        const content = comment.children.namedItem('content');
        if(content == null) {
            return false;
        }
        const authorChip = content.getElementsByTagName('yt-live-chat-author-chip');
        if (authorChip.length === 0) {
            // コメントが0ならオーナーも存在しない
            return false;
        }

        const authorName = authorChip[0].textContent;
        return authorName === ownerName
}

/**
 * チャットのコメント一覧を取得する
 * @returns コメント一覧。取得できなかった場合は``null```を返却する
 */
export function getChatElementsOrNull(): Element | null {
    const chatFrame: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('chatframe');
    const contentWindow = chatFrame.contentWindow;
    if(contentWindow == null) {
        return null;
    }
    const iDocument = contentWindow.document;
    return iDocument.getElementById('item-list');
}

/**
 * 全てのコメントのエレメントを取得する
 */
export function getAllCommentsOrNull(): HTMLCollectionOf<Element> | null {
    const chatFrame: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('chatframe');
    const contentWindow = chatFrame.contentWindow;
    if(contentWindow == null) {
        return null;
    }
    const iDocument = contentWindow.document;
    return iDocument.getElementsByTagName('yt-live-chat-text-message-renderer');
}

/**
 * 最新のコメントを取得する
 * @returns 最新のコメント(yt-live-chat-text-message-renderer)
 */
export function getLatestCommentOrNull(): Element | null {
    const comments = getAllCommentsOrNull();
    if(comments == null) {
        return null;
    }
    return comments[comments.length - 1];
}

/**
 * メッセージを取得する
 * @param comment yt-live-text-message-renderer
 * @returns 投稿されたメッセージ<br>メッセージが存在しなければ空文字
 */
export function getMessageOrNull(comment:Element): string | null {
    // TODO: commentがyt-live-text-message-rendererかを判定する
    const content = comment.children.namedItem('content');
    if (content == null) {
        return null;
    }
    const children = content.children;
    const namedItem = children.namedItem('message');
    if (namedItem == null) {
        return null;
    }
    return namedItem.textContent ?? null;
}
