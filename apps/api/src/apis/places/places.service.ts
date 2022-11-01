import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Repository } from 'typeorm';
import { Place } from '@for-noru/models';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfIsNil } from '@for-noru/common';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>
  ) {}

  async find() {
    return await this.placeRepo.find({ take: 100 });
  }

  async findOne(id: number) {
    return await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.placeRepo.save({ ...place, ...updatePlaceDto });
    // todo queue es 업데이트큐에 집어넣자
  }

  async remove(id: number) {
    const place = await this.placeRepo
      .findOne({ where: { id } })
      .then(throwIfIsNil(new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)));

    await this.placeRepo.save({ ...place, active: false });
    // todo queue es 업데이트큐에 집어넣자
  }
}
