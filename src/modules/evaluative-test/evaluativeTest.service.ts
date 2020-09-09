import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IQuestion } from './interface/question.interface';
import { TestDto } from './dto/test.dto';

@Injectable()
export class EvaluativetestService {
  constructor(
    @InjectModel('Question')
    private readonly questionModel: Model<IQuestion>
  ) { }

  public async GetTest(module: string): Promise<IQuestion[] | any> {
    const result = await this.questionModel.find(
      { module: module },
      { __v: 0 }
    ).exec();
    if (!result || result.length < 10) return { error: '', detail: '' };

    //organizar aleatoriamente
    let newResult = result.sort(() => (Math.random()));

    //devolver 10 preguntas
    return newResult.splice(0, 10);
  }

  public async EvalTest(test: TestDto): Promise<number | any> {
    const fullTest = await this.questionModel.find({ module: test.module });
    let count = 0;
    for (let i of fullTest) {
      for (let val of test.arrayRes) {
        count += i.solution === val.res ? 1 : 0;
      }
    }
    return count;

    //falta almacenar los resultados
  }
}
