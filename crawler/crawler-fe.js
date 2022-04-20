/**
  * @param params 调用参数，HTTP 请求下为请求体
  * @param context 调用上下文
  *
  * @return 函数的返回数据，HTTP 场景下会作为 Response Body
  *
  * 完整信息可参考：
  * https://qingfuwu.cn/docs/cloud-function/basic.html
  */

 module.exports = async function(params, context) {
  const tb = inspirecloud.db.table('nowcoder_fe')
  for (let i = 1; i<=100; i++) {
    const res = await axios.get(`https://www.nowcoder.com/discuss/experience/json?token=&tagId=644&companyId=0&phaseId=0&order=3&query=&page=${i}&_=1648907699852`)
    const postList = res.data.data.discussPosts
    for(const post of postList) {
      const single = {
        postId: post.postId,
        postTitle: post.postTitle,
        postTypeName: post.postTypeName,
        content: post.content,
        author: post.author,
        authorHead: post.authorHead,
        authorEducationInfo: post.authorEducationInfo,
        tags: post.tags,
        likeCnt: post.likeCnt,
        viewCnt: post.viewCnt,
        totalCommentCount: post.totalCommentCount,
        followTotal: post.followTotal,
        createTime: post.createTime
      }
      const result = await tb.save(single)
      console.log(result)
    }
  }
  return {
    ok: true
  }
}

/**
 *  postId
 *  postTitle
 *  postTypeName
 *  content(省略了)
 *  author
 *  authorHead
 *  authorEducationInfo
 *  tags
 *  likeCnt
 *  viewCnt
 *  totalCommentCount
 *  followTotal(收藏数)
 *  createTime
 * */ 
     