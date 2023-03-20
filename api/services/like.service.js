const LikeRepository = require("../repositories/like.repository");
const MusicRepository = require("../repositories/music.repository");
const { makeError } = require("../error");

class LikeService {
  likeRepository = new LikeRepository();
  musicRepository = new MusicRepository();

  like = async (userId, musicId) => {
    const findMusic = await this.musicRepository.findOneByMusicId({ musicId });
    if (!findMusic) {
      throw new makeError({ message: "좋아요 할 음악이 없습니다", code: 400 });
    }
    const like = await this.likeRepository.findLike(userId, musicId);
    if (!like) {
      await this.likeRepository.makeLike(userId, musicId);
      return { code: 201, message: "좋아요를 생성하였습니다" };
    } else {
      await this.likeRepository.deleteLike(userId, musicId);
      return { code: 200, message: "좋아요를 삭제하였습니다" };
    }
  };

  likeStatus = async(userId,musicId) =>{
    const findLike = await this.likeRepository.findLike(userId, musicId)
    if(!findLike){
      return {likeStatus : false}
    }else {
      return {likeStatus : true}
    }
  }
}

module.exports = LikeService;
