import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IScore } from './interface';
import { ScoreDto } from './dto';
import { Tag } from './../@common/enums';
import { IUser } from '../user/interface';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score')
    private readonly scoreModel: Model<IScore>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>
  ) { }

  public async CreateScore() {
    const score = new this.scoreModel(
      {
        _id: Types.ObjectId(),
        key: '1',
        tag: Tag.A,
        cal: 10,
        idPeople: '5e83ca99902fa9638005138d',
        idTheme: '5f0765b0c34ee3a18e005dd2'
      }
    );
    await score.save();
    return true;
  }

  public async GetScore(userName: ScoreDto) {
    const data = await this.userModel.findOne({ userName: userName.userName });
    if (!data) return { error: 'NO_EXISTS_USER', detail: 'usted es infiltrado!' };
    const { people } = data;
    const score = await this.scoreModel.aggregate([
      {
        $lookup: {
          from: "peoples",
          localField: "idPeople",
          foreignField: "_id",
          as: "peopleDoc"
        }
      },
      { $unwind: "$peopleDoc" },
      {
        $lookup: {
          from: "datas",
          localField: "idTheme",
          foreignField: "_id",
          as: "theme"
        }
      },
      { $unwind: '$theme' },
      {
        $match: {
          idPeople: people
        }
      },
      {
        $project: {
          _id: 0,
          key: 1,
          tag: 1,
          cal: 1,
          idPeople: 1,
          name: "$peopleDoc.name",
          lastName: "$peopleDoc.lastName",
          theme: "$theme.title"
        }
      }

    ]).exec();
    return (score && score.length > 0) ? score : { error: 'NO_SCORE', detail: 'No ha realizado ninguna evaluacion aun!' };
  }

}
