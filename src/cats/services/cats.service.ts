import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat, ApiResponse } from '../interfaces';
import { UpdateCatDto } from '../dtos';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      name: 'ans',
      age: 3,
      breed: 'pwd',
    },
    {
      name: 'shan',
      age: 3,
      breed: 'dha',
    },
    {
      name: 'umar',
      age: 3,
      breed: 'g15',
    },
    {
      name: 'billu',
      age: 3,
      breed: 'pindi',
    },
    {
      name: 'shah',
      age: 3,
      breed: 'f15',
    },
  ];

  createCat(newCat: Cat): ApiResponse<Cat> {
    this.cats.push(newCat);
    this.cats.splice(this.cats.length - 1, 0, newCat);
    return { msg: 'Cat created successfully', data: newCat };
  }

  findCat(id: string): ApiResponse<Cat> {
    const singleCat: Cat = this.cats[id];
    if (!singleCat) throw new NotFoundException('Invalid cat index');
    return { msg: 'Cat returned successfully', data: singleCat };
  }

  findAllCats(offset: number, limit: number) {
    offset = Number(offset);
    limit = Number(limit);
    if (!limit && !offset)
      return {
        msg: 'Got all the cats successfully',
        data: this.cats,
      }; // Return the array as is if limit and offset are undefined
    return {
      msg: 'Got all the cats successfully',
      data: this.cats.slice(offset, offset + limit),
    };
  }

  updateCat(id: string, updateCatDto: UpdateCatDto): ApiResponse<Cat> {
    const parsedIndex = parseInt(id, 10);

    if (
      isNaN(parsedIndex) ||
      parsedIndex < 0 ||
      parsedIndex >= this.cats.length
    ) {
      throw new NotFoundException('Invalid cat index');
    }

    const catToUpdate = this.cats[parsedIndex];

    catToUpdate.name = updateCatDto.name ? updateCatDto.name : catToUpdate.name;
    catToUpdate.age = updateCatDto.age ? updateCatDto.age : catToUpdate.age;
    catToUpdate.breed = updateCatDto.breed
      ? updateCatDto.breed
      : catToUpdate.breed;

    return { msg: 'Cat updated successfully', data: catToUpdate };
  }

  deleteCat(id: string): ApiResponse<Cat[]> {
    const parsedIndex = parseInt(id, 10);

    if (
      isNaN(parsedIndex) ||
      parsedIndex < 0 ||
      parsedIndex >= this.cats.length
    ) {
      throw new NotFoundException('Invalid cat index');
    }

    const deletedCat = this.cats.splice(parsedIndex, 1);

    return {
      msg: `Cat deleted successfully at index ${parsedIndex}`,
      data: deletedCat,
    };
  }
}
